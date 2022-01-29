import { Request, Response } from "express";
import UserModel from "../models/Users.models";
import { returnServerError } from "../app/constants";
import { getContacts, getUserData } from "../services/auth.services";
import { getPostByAuthor } from "../services/post.services";
class UserController {
    // [GET] /api/user/:username
    // @desc Get user basic information
    public async getUser(req: Request, res: Response) {
        try {
            const { full } = req.query;
            if (full === "true") {
                const user = await UserModel.findOne({
                    nickname: req.params.username,
                }).populate([{ path: "follow" }]);
                if (!user) {
                    return res.status(404).json({
                        success: false,
                        message: "User not found",
                    });
                }
                const posts = await getPostByAuthor(user.nickname);
                return res.json({ success: true, user, posts });
            }
            const user = await UserModel.findOne({
                nickname: req.params.username,
            });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }
            return res.json({ success: true, user });
        } catch (err) {
            return returnServerError(res, err.message);
        }
    }
    // [GET] /api/user/friends/:username
    // @desc Get friends
    public async getFriends(req: Request, res: Response) {
        try {
            if (!req.headers.authorization) {
                return res.status(403).json({
                    success: false,
                    message: "User is not logged in",
                });
            }
            const userData = await getUserData(
                req.headers.authorization.split(" ")[1],
            );
            if (!userData.success) {
                return res.status(500).json({
                    success: false,
                    message: userData.message,
                });
            }

            const user = await UserModel.findOne({
                nickname: userData.userData.nickname,
            });
            const contacts = await getContacts(
                userData.userData.identities[0].access_token,
            );
            if (!user) {
                return res.json({
                    success: false,
                    message: "User not found",
                });
            }
            return res.json({ success: true, contacts });
        } catch (err) {
            return returnServerError(res, err.message);
        }
    }
    // [GET] /api/user/search/:username
    // @desc Search
    public async getSearch(req: Request, res: Response) {
        try {
            const { username } = req.params;
            if (!username) {
                return res
                    .status(400)
                    .json({ success: false, message: "No search value" });
            }
            const users = await UserModel.find({
                fullName: { $regex: username, $options: "i" },
            });
            return res.json({ success: true, users });
        } catch (err) {
            return returnServerError(res, err.message);
        }
    }
}

export default new UserController();
