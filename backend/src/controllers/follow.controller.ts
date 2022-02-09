import { returnServerError } from "../app/constants";
import { Request, Response } from "express";
import { followUser, getFollow } from "../services/follow.services";

class FollowController {
    // [GET] /follow/:user
    // @desc Get user follow
    public async index(req: Request, res: Response): Promise<Response> {
        try {
            const { user } = req.params;
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "Username is not defined",
                });
            }
            const followList = await getFollow(user);
            if (!followList.success) {
                return returnServerError(res, followList.message);
            }
            return res.json({ success: true, follow: followList.follow });
        } catch (err) {
            return returnServerError(res, err.message);
        }
    }
    // [GET] /follow/toggle/:user
    // @desc Toggle follow
    public async toggleFollow(req: Request, res: Response): Promise<Response> {
        try {
            if (!req.headers.authorization) {
                return res.status(403).json({
                    success: false,
                    message: "User is not logged in",
                });
            }
            const { user } = req.params;
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "Username is not defined",
                });
            }
            const follow = await followUser(
                user,
                req.headers.authorization.split(" ")[1],
            );
            if (!follow.success) {
                return returnServerError(res, follow.message);
            }
            return res.json({
                success: true,
                follow: follow.follow,
                followStatus: follow.followStatus,
            });
        } catch (err) {
            return returnServerError(res, err.message);
        }
    }
}

export default new FollowController();
