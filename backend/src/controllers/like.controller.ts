import { returnServerError } from "../app/constants";
import LikeModel from "../models/Like.models";
import { Request, Response } from "express";
import { getUserData } from "../services/auth.services";

class LikeController {
    // [GET] /api/like/:postId
    // @desc Get like of a post
    public async index(req: Request, res: Response): Promise<Response> {
        try {
            const { postId } = req.params;
            const likes = await LikeModel.findOne({ postId });
            if (!likes) {
                return res
                    .status(404)
                    .json({ success: false, message: "Post not found" });
            }
            return res.json({ success: true, likes });
        } catch (err) {
            return returnServerError(res, err.message);
        }
    }
    // [POST] /api/like/toggle/:postId
    // @desc Toggle like
    public async toggle(req: Request, res: Response): Promise<Response> {
        try {
            if (!req.headers.authorization) {
                return res.status(403).json({
                    success: false,
                    message: "User is not logged in",
                });
            }
            const { postId } = req.params;
            const likes = await LikeModel.findOne({ postId });
            if (!likes) {
                return res
                    .status(404)
                    .json({ success: false, message: "Post not found" });
            }
            const user = await getUserData(
                req.headers.authorization.split(" ")[1]
            );
            if (!user.success && !user.userData) {
                return res
                    .status(403)
                    .json({ success: false, message: "User is not logged in" });
            }
            if (likes.likeList.includes(user.userData.nickname)) {
                await LikeModel.findOneAndUpdate(
                    { postId },
                    {
                        $pull: { likeList: user.userData.nickname },
                        $inc: { likeCount: -1 },
                    },
                    { new: true }
                );
                return res.json({ success: true, message: "Unliked" });
            }
            await LikeModel.findOneAndUpdate(
                { postId },
                {
                    $push: { likeList: user.userData.nickname },
                    $inc: { likeCount: +1 },
                },
                { new: true }
            );
            return res.json({ success: true, message: "Liked" });
        } catch (err) {
            return returnServerError(res, err.message);
        }
    }
}

export default new LikeController();
