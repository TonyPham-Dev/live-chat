import { Request, Response } from "express";
import axios from "axios";
import PostModel from "../models/Posts.models";
import CommentModel from "../models/Comments.models";
import { postUpload } from "../config/gridFsStorage.config";
import { returnServerError } from "../app/constants";
import variables from "../config/variables.config";

class PostController {
    // [GET] /posts/:postId
    // @desc Get post from postId
    public async getFromPostId(req: Request, res: Response) {
        try {
            const postId = req.params.postId;
            const post = await PostModel.findById(postId);
            // check if post exists
            if (!post) {
                return res.status(404).json({
                    success: false,
                    message: "Post not found",
                });
            }
            return res.status(200).json({
                success: true,
                post,
            });
        } catch (err) {
            return returnServerError(res, err.message);
        }
    }
    // [POST] /posts/new
    // @desc Create new post
    public async newPost(req: Request, res: Response) {
        try {
            postUpload(req, res, async (err) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err.message,
                    });
                } else {
                    const { title, body } = req.body;

                    const filenameList: string[] = [];

                    if (req.files && req.files.length !== 0) {
                        const files: Express.Multer.File[] = Array.isArray(
                            req.files
                        ) && [...req.files];
                        files.forEach((file) => {
                            filenameList.push(`/images/${file.filename}`);
                        });
                    }

                    const userInfoFromAuth0 = await axios
                        .get(`https://${variables.auth0DomainUrl}/userinfo`, {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: req.headers.authorization,
                            },
                        })
                        .then((data) => data.data);
                    if (!userInfoFromAuth0) {
                        return res.status(401).json({
                            success: false,
                            message: "User is not logged in",
                        });
                    }

                    const newPost = new PostModel({
                        title,
                        body,
                        imgList: filenameList,
                        author: userInfoFromAuth0.nickname,
                    });
                    await newPost.save();
                    const newPostComment = new CommentModel({
                        postId: newPost._id,
                        commentList: [],
                    });
                    await newPostComment.save();
                    console.log(newPostComment);
                    return res.status(200).json({
                        success: true,
                        message: "Post created",
                    });
                }
            });
        } catch (err) {
            return returnServerError(res, err.message);
        }
    }
}

export default new PostController();
