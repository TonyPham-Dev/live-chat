import { UserData } from "../app/types";
import CommentModel from "../models/Comments.models";
import UserModel from "../models/Users.models";

interface UserBasicInfo {
    [key: string]: UserData;
}

interface Response {
    success: boolean;
    message?: string;
    comments?: any;
    usersBasicInfo?: UserBasicInfo;
}

export const getComment: (postId: string) => Promise<Response> = async (
    postId
) => {
    try {
        const comments = await CommentModel.findOne({ postId });
        const users = Array.from(
            new Set([...comments.commentList.map((c: any) => c.author)])
        );
        const usersData = await UserModel.find({
            nickname: { $in: users },
        });
        const usersBasicInfo: UserBasicInfo = {};
        users.forEach((user) => {
            usersBasicInfo[user] = usersData.find((u) => u.nickname === user);
        });
        return { success: true, comments, usersBasicInfo };
    } catch (err) {
        return { success: false, message: err.message };
    }
};
