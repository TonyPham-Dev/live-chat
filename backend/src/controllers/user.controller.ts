import { Request, Response } from "express";
import UserModel from "../models/Users.models";
import { returnServerError } from "../app/constants";
import { getContacts } from "../services/auth.services";
import { getUserData } from "../services/auth.services";
class UserController {
    // [GET] /api/user/:username
    public async getUser(req: Request, res: Response) {
        try {
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
    public async getFriends(req: Request, res: Response) {
        try {
            const userData = await getUserData(
                req.headers.authorization.split(" ")[1]
            );

            // add to mongodb
            const user = await UserModel.findOne({
                nickname: userData.nickname,
            });
            const contacts = await getContacts(
                userData.identities[0].access_token
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
}

export default new UserController();
