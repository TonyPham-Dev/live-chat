import FollowModel from "../models/Follow.models";
import UserModel from "../models/Users.models";
import { getUserData } from "./auth.services";

interface GetFollow {
    success: boolean;
    message?: string;
    follow?: {
        user: string;
        following: string[];
        followed: string[];
    };
}

interface FollowUser {
    success: boolean;
    message?: string;
    follow?: any;
    followStatus?: boolean;
}

export const getFollow: (user: string) => Promise<GetFollow> = async (user) => {
    try {
        const follow = await FollowModel.findOne({ user });
        if (!follow) {
            return { success: false, message: "User not found" };
        }
        return { success: true, follow };
    } catch (err) {
        return { success: false, message: err.message };
    }
};

export const followUser: (
    user: string,
    token: string,
) => Promise<FollowUser> = async (user, token) => {
    try {
        const targetUser = await UserModel.findOne({ nickname: user });
        const targetUserFollowList = await getFollow(user);
        if (!targetUser || !targetUserFollowList.success) {
            return { success: false, message: "User does not exist" };
        }
        const userData = await getUserData(token);
        if (!userData.success) {
            return { success: false, message: userData.message };
        }
        let followStatus: boolean;
        let follow: any;
        if (
            targetUserFollowList.follow.followed.includes(
                userData.userData.nickname,
            )
        ) {
            // unfollow
            follow = await FollowModel.findOneAndUpdate(
                { user: user },
                {
                    $pull: {
                        followed: userData.userData.nickname,
                    },
                },
                { new: true },
            );
            await FollowModel.findOneAndUpdate(
                { user: userData.userData.nickname },
                {
                    $pull: {
                        following: user,
                    },
                },
                { new: true },
            );
            followStatus = false;
        } else {
            // follow
            follow = await FollowModel.findOneAndUpdate(
                { user: user },
                {
                    $push: {
                        followed: userData.userData.nickname,
                    },
                },
                { new: true },
            );
            await FollowModel.findOneAndUpdate(
                { user: userData.userData.nickname },
                {
                    $push: {
                        following: user,
                    },
                },
                { new: true },
            );
            followStatus = true;
        }
        return { success: true, followStatus, follow };
    } catch (err) {
        return { success: false, message: err.message };
    }
};
