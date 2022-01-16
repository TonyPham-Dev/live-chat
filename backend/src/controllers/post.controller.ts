import { Request, Response } from "express";
import axios from "axios";
import PostModel from "../models/Posts.models";
import CommentModel from "../models/Comments.models";
import { postUpload } from "../config/gridFsStorage.config";
import { returnServerError } from "../app/constants";
import variables from "../config/variables.config";
import { getGfs } from "../config/db.config";

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
            if (!req.headers.authorization) {
                return res.status(403).json({
                    success: false,
                    message: "User is not logged in",
                });
            }
            const { body } = req.body;
            if (!body) {
                return res.status(400).json({
                    success: false,
                    message: "Post body is required",
                });
            }
            postUpload.fields([
                { name: "images", maxCount: 10 },
                { name: "videos", maxCount: 5 },
            ])(req, res, async (err) => {
                if (err) {
                    console.log("here");
                    return res.status(500).json({
                        success: false,
                        message: err.message,
                    });
                } else {
                    const { body } = req.body;
                    const files: any = { ...req.files };
                    const images: string[] = [];
                    const videos: string[] = [];
                    files.images.forEach((file: Express.Multer.File) => {
                        images.push(file.filename);
                    });
                    files.videos.forEach((file: Express.Multer.File) => {
                        videos.push(file.filename);
                    });
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
                        body,
                        imgList: images,
                        vidList: videos,
                        author: userInfoFromAuth0.nickname,
                    });
                    await newPost.save();
                    const newPostComment = new CommentModel({
                        postId: newPost._id,
                        commentList: [],
                    });
                    await newPostComment.save();
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
    // [PUT] /posts/edit/:postId
    // @desc Edit post
    public async editPost(req: Request, res: Response) {
        try {
            const { postId } = req.params;
            const post = await PostModel.findById(postId);
            if (!post) {
                return res.status(404).json({
                    success: false,
                    message: "Post not found",
                });
            }
            return res.json({ success: true, message: "Post edited" });
        } catch (err) {
            return returnServerError(res, err.message);
        }
    }
    // [DELETE] /posts/del:postId
    // @desc Delete post
    public async deletePost(req: Request, res: Response) {
        try {
            const { postId } = req.params;
            const post = await PostModel.findById(postId);
            if (!post) {
                return res.status(404).json({
                    success: false,
                    message: "Post not found",
                });
            }
            await PostModel.findByIdAndDelete(postId);
            return res.json({
                success: true,
                message: "Post deleted successfully",
            });
        } catch (err) {
            return returnServerError(res, err.message);
        }
    }
}

export default new PostController();
