import { Request, Response } from "express"
import axios from "axios"
import CommentModel from "../models/Comments.models"
import PostModel from "../models/Posts.models"
import { returnServerError } from "../app/constants"

class CommentController {
    // [GET] /comments/:postId
    // @desc Get all comments from a post
    public async getCommentFromPost(req: Request, res: Response) {
        try {
            const { postId } = req.params
            // get post
            const comments = await CommentModel.findOne({ postId })
            // check if post exist
            if (!comments) {
                return res.status(404).json({
                    message: "No post found",
                })
            }
            return res.json(comments)
        } catch (err) {
            return returnServerError(res, err.message)
        }
    }

    // [POST] /comments/:postId
    // @desc Add a comment to a post
    public async addCommentToPost(req: Request, res: Response) {
        try {
            const { postId } = req.params
            const { content } = req.body

            const userInfo = await axios
                .get(`${process.env.AUTH0_DOMAIN_URL}/userinfo`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: req.headers.authorization,
                    },
                })
                .then((data) => data.data)
            // check if post exist
            const post = await PostModel.findById(postId)
            if (!post) {
                return res.status(404).json({
                    message: "No post found",
                })
            }
            // add comment to post
            await CommentModel.findOneAndUpdate(
                { postId },
                {
                    $push: {
                        commentList: {
                            author: userInfo.nickname,
                            content,
                        },
                    },
                },
                { new: true }
            )

            return res.json({
                success: true,
                message: "Comment added",
            })
        } catch (err) {
            return returnServerError(res, err.message)
        }
    }
}

export default new CommentController()
