import UserModel from "../models/Users.models";
import PostModel from "../models/Posts.models";
import { getUserData } from "./auth.services";
import { getFollow } from "./follow.services";
import { UserData } from "../app/types";

interface UserBasicInfo {
    [key: string]: UserData;
}

interface GetAllPostRes {
    success: boolean;
    message?: string;
    status?: number;
    posts?: any;
    pages?: number;
    usersData?: any;
}

const populateList: string[] = ["comment", "like"];

export const getAllPost: (
    page: number,
    accessToken: string,
    all: boolean,
) => Promise<GetAllPostRes> = async (page, accessToken, all) => {
    try {
        const limitPerPage = 10;
        let posts;
        let count: number;
        if (all) {
            posts = await PostModel.find({})
                .populate(populateList)
                .limit(limitPerPage)
                .skip(limitPerPage * (Number(page) - 1))
                .sort({ createdAt: -1 });
            count = await PostModel.countDocuments();
        } else {
            const userData = await getUserData(accessToken);
            if (!userData.success) {
                return {
                    success: false,
                    message: "User is not logged in",
                    status: 401,
                };
            }
            const follow = await getFollow(userData.userData.nickname);
            if (!follow.success) {
                return {
                    success: false,
                    message: "User is not logged in",
                    status: 401,
                };
            }
            posts = await PostModel.find({
                author: { $in: follow.follow.following },
            })
                .populate(populateList)
                .limit(limitPerPage)
                .skip(limitPerPage * (Number(page) - 1))
                .sort({ createdAt: -1 });

            count = await PostModel.find({
                author: { $in: follow.follow.following },
            }).countDocuments();
        }
        const users = Array.from(
            new Set(
                posts
                    .map((post) => [
                        post.author,
                        [
                            ...post.comment[0].commentList.map(
                                (comment: {
                                    author: string;
                                    content: string;
                                    _id: string;
                                }) => comment.author,
                            ),
                        ],
                    ])
                    .flat(Infinity),
            ),
        );
        const usersData = await UserModel.find({ nickname: { $in: users } });
        const usersBasicInfo: UserBasicInfo = {};
        users.forEach((user) => {
            usersBasicInfo[user] = usersData.find((u) => u.nickname === user);
        });

        return {
            success: true,
            posts,
            pages: Math.ceil(count / limitPerPage),
            usersData: usersBasicInfo,
        };
    } catch (err) {
        return { success: false, message: err.message, status: 500 };
    }
};

export const getPostById: (postId: string) => Promise<any> = async (postId) => {
    try {
        const post = await PostModel.findById(postId)
            .populate(populateList)
            .sort({ createdAt: -1 });
        if (!post) {
            return {
                success: false,
                message: "Post not found",
                status: 404,
            };
        }
        const users = Array.from(
            new Set([
                post.author,
                ...post.comment[0].commentList.map((c: any) => c.author),
            ]),
        );
        const usersData = await UserModel.find({ nickname: { $in: users } });
        const usersBasicInfo: UserBasicInfo = {};
        users.forEach((user) => {
            usersBasicInfo[user] = usersData.find((u) => u.nickname === user);
        });
        return { success: true, post, usersData: usersBasicInfo };
    } catch (err) {
        return { success: false, message: err.message, status: err.status };
    }
};

export const getPostByAuthor: (author: string) => Promise<any> = async (
    author,
) => {
    try {
        const posts = await PostModel.find({ author })
            .populate(populateList)
            .sort({ createdAt: -1 });
        if (!posts) {
            return {
                success: false,
                message: "Post not found",
                status: 404,
            };
        }
        const users = Array.from(
            new Set(
                posts
                    .map((post: any) =>
                        post.comment[0].commentList.map(
                            (cmt: any) => cmt.author,
                        ),
                    )
                    .flat(Infinity),
            ),
        );

        const usersData = await UserModel.find({ nickname: { $in: users } });
        const usersBasicInfo: UserBasicInfo = {};
        users.forEach((user) => {
            usersBasicInfo[user] = usersData.find((u) => u.nickname === user);
        });
        return { success: true, post: posts, usersData: usersBasicInfo };
    } catch (err) {
        return { success: false, message: err.message, status: err.status };
    }
};
