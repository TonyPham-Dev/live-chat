import { Request, Response } from "express";
import CommentModel from "../models/Comments.models";
import PostModel from "../models/Posts.models";
import { returnServerError } from "../app/constants";
import { getUserData } from "../services/auth.services";

class CommentController {
    // [GET] /comments/:postId
    // @desc Get all comments from a post
    public async getCommentFromPost(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const { postId } = req.params;
            // get post
            const comments = await CommentModel.findOne({ postId });
            // check if post exist
            if (!comments) {
                return res.status(404).json({
                    message: "No post found",
                });
            }
            return res.json(comments);
        } catch (err) {
            return returnServerError(res, err.message);
        }
    }

    // [POST] /comments/:postId
    // @desc Add a comment to a post
    public async addCommentToPost(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            if (!req.headers.authorization) {
                return res.status(403).json({
                    success: false,
                    message: "User is not logged in",
                });
            }
            const { postId } = req.params;
            const { content } = req.body;
            if (!content) {
                return res.status(400).json({
                    success: false,
                    message: "Content is required",
                });
            }

            const userData = await getUserData(
                req.headers.authorization.split(" ")[1]
            );
            if (!userData.success) {
                return res.status(500).json({
                    success: false,
                    message: userData.message,
                });
            }
            // check if post exist
            const post = await PostModel.findById(postId);
            if (!post) {
                return res.status(404).json({
                    message: "No post found",
                });
            }
            // add comment to post
            await CommentModel.findOneAndUpdate(
                { postId },
                {
                    $push: {
                        commentList: {
                            author: userData.userData.nickname,
                            content,
                        },
                    },
                },
                { new: true }
            );

            return res.json({
                success: true,
                message: "Comment added",
            });
        } catch (err) {
            return returnServerError(res, err.message);
        }
    }
}

export default new CommentController();
