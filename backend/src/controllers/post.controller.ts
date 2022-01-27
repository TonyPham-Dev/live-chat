import { Request, Response } from "express";
import PostModel from "../models/Posts.models";
import LikeModel from "../models/Like.models";
import CommentModel from "../models/Comments.models";
import { postUpload } from "../config/gridFsStorage.config";
import { returnServerError } from "../app/constants";
import { getUserData } from "../services/auth.services";
import { deleteMedias } from "../services/media.services";
import { getAllPost, getPostById } from "../services/post.services";

class PostController {
    private static populateList: string[] = ["comment", "userInfo", "like"];
    // [GET] /posts
    // @desc Get post for homepage
    public async index(req: Request, res: Response): Promise<Response> {
        try {
            const { page = 1, all } = req.query;
            if (!req.headers.authorization) {
                return res.status(403).json({
                    success: false,
                    message: "User is not logged in",
                });
            }
            const posts = await getAllPost(
                Number(page),
                req.headers.authorization.split(" ")[1],
                all ? true : false,
            );
            if (!posts.success) {
                return res.status(posts.status).json({
                    success: false,
                    message: posts.message,
                });
            }
            return res.json(posts);
        } catch (err) {
            return returnServerError(res, err.message);
        }
    }
    // [GET] /posts/:postId
    // @desc Get post from postId
    public async getFromPostId(req: Request, res: Response): Promise<Response> {
        try {
            const { postId } = req.params;
            if (!postId) {
                return res.status(400).json({
                    success: false,
                    message: "Post ID is required",
                });
            }
            const posts = await getPostById(postId);
            if (!posts.success) {
                return res
                    .status(posts.status)
                    .json({ success: false, message: posts.message });
            }
            return res.json(posts);
        } catch (err) {
            return returnServerError(res, err.message);
        }
    }
    // [POST] /posts/new
    // @desc Create new post
    public async newPost(req: Request, res: Response): Promise<Response> {
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
                        const response = await deleteMedias([
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
                    const newPostComment = new CommentModel({
                        postId: newPost._id,
                        commentList: [],
                    });
                    const newPostLike = new LikeModel({
                        postId: newPost._id,
                        likeList: [],
                        likeCount: 0,
                    });
                    await Promise.all([
                        newPost.save(),
                        newPostLike.save(),
                        newPostComment.save(),
                    ]);
                    const responsePost = await getPostById(newPost.id);
                    return res.status(200).json({
                        success: true,
                        message: "Post created",
                        post: responsePost.post,
                    });
                }
            });
        } catch (err) {
            return returnServerError(res, err.message);
        }
    }
    // [PUT] /posts/:postId
    // @desc Edit post
    public async editPost(req: Request, res: Response): Promise<Response> {
        try {
            const { postId } = req.params;
            if (!postId) {
                return res.status(400).json({
                    success: false,
                    message: "Post ID is required",
                });
            }
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

            const post = await PostModel.findById(postId);
            if (!post) {
                return res.status(404).json({
                    success: false,
                    message: "Post not found",
                });
            }
            if (userData.userData.nickname !== post.author) {
                return res.status(401).json({
                    success: false,
                    message: "User is not authorized",
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
                        const response = await deleteMedias([
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
                    const deletePrevMedia = await deleteMedias([
                        ...post.imgList,
                        ...post.vidList,
                    ]);
                    if (!deletePrevMedia.success) {
                        return returnServerError(res, deletePrevMedia.message);
                    }
                    console.log(images);

                    const newPost = await PostModel.findByIdAndUpdate(
                        postId,
                        {
                            body,
                            imgList: images,
                            vidList: videos,
                        },
                        { new: true },
                    );
                    const responsePost = await getPostById(newPost.id);
                    return res.json({
                        success: true,
                        message: "Post edited",
                        post: responsePost.post,
                    });
                }
            });
        } catch (err) {
            return returnServerError(res, err.message);
        }
    }
    // [DELETE] /posts/:postId
    // @desc Delete post
    public async deletePost(req: Request, res: Response): Promise<Response> {
        try {
            const { postId } = req.params;
            if (!postId) {
                return res.status(400).json({
                    success: false,
                    message: "Post ID is required",
                });
            }
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

            const post = await PostModel.findById(postId);
            if (!post) {
                return res.status(404).json({
                    success: false,
                    message: "Post not found",
                });
            }
            if (userData.userData.nickname !== post.author) {
                return res.status(401).json({
                    success: false,
                    message: "User is not authorized",
                });
            }
            const response = await Promise.all([
                deleteMedias([...post.imgList, ...post.vidList]),
                PostModel.findByIdAndDelete(postId),
                CommentModel.findOneAndDelete({ postId }),
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
