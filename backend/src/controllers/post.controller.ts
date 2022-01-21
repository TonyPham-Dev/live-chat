import { Request, Response } from "express";
import PostModel from "../models/Posts.models";
import CommentModel from "../models/Comments.models";
import { postUpload } from "../config/gridFsStorage.config";
import { returnServerError } from "../app/constants";
import { getUserData } from "../services/auth.services";
import { deleteImgs } from "../services/image.services";

class PostController {
    // [GET] /posts
    // @desc Get post for homepage
    public async index(req: Request, res: Response) {
        try {
            if (!req.headers.authorization) {
                return res.status(403).json({
                    success: false,
                    message: "User is not logged in",
                });
            }
            const userData = await getUserData(
                req.headers.authorization.split(" ")[1]
            );
        } catch (err) {
            return returnServerError(res, err.message);
        }
    }
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
            return res.json({
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
            const userData = await getUserData(
                req.headers.authorization.split(" ")[1]
            );
            if (!userData.success) {
                return res.status(500).json({
                    success: false,
                    message: userData.message,
                });
            }
            postUpload.fields([
                { name: "images", maxCount: 10 },
                { name: "videos", maxCount: 5 },
            ])(req, res, async (err) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err.message,
                    });
                } else {
                    const { body } = req.body;
                    const files: any = { ...req.files };
                    const images: string[] = [];
                    const videos: string[] = [];
                    files.images &&
                        files.images.length > 0 &&
                        files.images.forEach((file: Express.Multer.File) => {
                            images.push(file.filename);
                        });
                    files.videos &&
                        files.videos.length > 0 &&
                        files.videos.forEach((file: Express.Multer.File) => {
                            videos.push(file.filename);
                        });
                    if (!body) {
                        const response = await deleteImgs([
                            ...images,
                            ...videos,
                        ]);
                        if (!response.success) {
                            return returnServerError(res, response.message);
                        }
                        return res.status(400).json({
                            success: false,
                            message: "Post body is required",
                        });
                    }

                    const newPost = new PostModel({
                        body,
                        imgList: images,
                        vidList: videos,
                        author: userData.userData.nickname,
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
                        id: newPost._id,
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
    // [DELETE] /posts/del/:postId
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
            const response = await Promise.all([
                deleteImgs([...post.imgList, ...post.vidList]),
                PostModel.findByIdAndDelete(postId),
            ]);
            if (!response[0].success) {
                return returnServerError(res, response[0].message);
            }
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
