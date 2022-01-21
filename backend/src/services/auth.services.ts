import variables from "../config/variables.config";
import UserModel from "../models/Users.models";
import FollowModel from "../models/Follow.models";
import axios from "axios";
import { auth0 } from "../config/auth0.config";
import { UserDataRes, UserDataWithAccessToken } from "../app/types";
import AuthCacheModel from "../models/AuthCache.models";

export const getUserData: (authToken: string) => Promise<UserDataRes> = async (
    authToken
) => {
    try {
        const authCache = await AuthCacheModel.findOne({ token: authToken });
        if (authCache) {
            const timeDiff =
                Date.now() - new Date(authCache.createdAt).getTime();
            if (
                timeDiff < variables.tokenExpiredHour * 60 * 60 * 1000 &&
                timeDiff > 0
            ) {
                return { success: true, userData: authCache.userData };
            }
        }
        const accessTokenAndUserId = [
            auth0
                .clientCredentialsGrant({
                    audience: variables.auth0Audience,
                    scope: "read:user_idp_tokens",
                })
                .then((data: any) => data.access_token),
            axios
                .get(`https://${variables.auth0DomainUrl}/userinfo`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                })
                .then((data) => data.data.sub),
        ];
        const [accessToken, userId] = await Promise.all(accessTokenAndUserId);
        const userData = await axios
            .get<UserDataWithAccessToken>(
                `${variables.auth0Audience}users/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            )
            .then((data) => data.data);
        const userFromDB = await UserModel.findOne({
            nickname: userData.nickname,
        });
        if (!userFromDB) {
            return {
                success: false,
                message: "User not found in DB",
                userData,
            };
        }
        const caches = await AuthCacheModel.find({
            "userData.nickname": userData.nickname,
        });
        const deletePromise: any[] = [];
        caches.forEach((cache) => {
            const timeDiff = Date.now() - new Date(cache.createdAt).getTime();
            if (
                timeDiff > variables.tokenExpiredHour * 60 * 60 * 1000 &&
                timeDiff > 0
            ) {
                deletePromise.push(
                    AuthCacheModel.findOneAndDelete({ token: cache.token })
                );
            }
        });
        await Promise.all(deletePromise);
        const newAuthCache = new AuthCacheModel({
            token: authToken,
            userData,
        });
        await newAuthCache.save();
        return { success: true, userData };
    } catch (err) {
        return { success: false, message: err.message };
    }
};

export const getContacts: (accessToken: string) => Promise<any> = async (
    accessToken
) => {
    const contacts = await axios
        .get(
            "https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        )
        .then((data) => data.data);
    return contacts;
};

export const createUser: (
    nickname: string,
    avatarUrl: string,
    fullName: string,
    email: string
) => Promise<any> = async (nickname, avatarUrl, fullName, email) => {
    try {
        const newUser = new UserModel({
            nickname,
            avatarUrl,
            fullName,
            email,
        });
        await newUser.save();
        const newFollow = new FollowModel({
            user: nickname,
        });
        await newFollow.save();
        return { success: true, userData: newUser };
    } catch (err) {
        console.log(err);
        return { success: false, message: err.message };
    }
};
