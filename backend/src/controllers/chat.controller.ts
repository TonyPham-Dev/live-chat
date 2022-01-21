import { newTextMessage } from "./../services/message.services";
import { Request, Response } from "express";
import { chatUpload } from "../config/gridFsStorage.config";
import { returnServerError } from "../app/constants";
import ChatModel from "../models/Chat.models";
import { getUserData } from "../services/auth.services";
import { newChat } from "../services/message.services";

class ChatController {
    // [GET] /api/chat/:chatId
    // @desc Get chat conversation
    public async getChat(req: Request, res: Response): Promise<Response> {
        try {
            const chat = await ChatModel.findById(req.params.chatId);
            if (!chat) {
                return res.status(404).json({
                    success: false,
                    message: "Chat not found",
                });
            }
            return res.json({ success: true, chat });
        } catch (err) {
            return returnServerError(res, err.message);
        }
    }
    // [GET] /chat
    // @desc Get all chat
    public async getAll(req: Request, res: Response): Promise<Response> {
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
            const chats = await ChatModel.find({
                users: userData.userData.nickname,
            }).sort({ updatedAt: -1 });
            return res.json(chats);
        } catch (err) {
            return returnServerError(res, err.message);
        }
    }
    // [POST] /chat/new
    // @desc Create new chat conversation
    public async newChat(req: Request, res: Response): Promise<Response> {
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
            const { users } = req.body;
            if (!users) {
                return res.status(400).json({
                    success: false,
                    message: "Users are required",
                });
            }
            const ifChatExisted = await ChatModel.findOne({
                users: [userData.userData.nickname, ...users],
            });
            if (ifChatExisted) {
                return res.status(400).json({
                    success: true,
                    message: "Chat existed",
                    chat: ifChatExisted,
                });
            }
            const newConversation = await newChat([
                userData.userData.nickname,
                ...users,
            ]);
            if (newConversation.success) {
                return res.json({
                    success: true,
                    chat: newConversation.chat,
                });
            }
            return res.json({
                success: false,
                message: newConversation.err,
            });
        } catch (err) {
            return returnServerError(res, err.message);
        }
    }
    // [POST] /chat/img/:chatId
    // @desc Add img to chat
    public async newImg(req: Request, res: Response): Promise<Response> {
        try {
            chatUpload.array("images", 10)(req, res, async (err) => {
                if (err) {
                    return returnServerError(res, err.message);
                } else {
                    let fileList: string[] = [];
                    if (req.files && req.files.length > 0) {
                        const files: Express.Multer.File[] = Array.isArray(
                            req.files
                        ) && [...req.files];
                        files.forEach((file) => {
                            fileList.push(file.filename);
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

                    await ChatModel.findByIdAndUpdate(
                        req.params.chatId,
                        {
                            $push: {
                                messages: {
                                    user: userData.userData.nickname,
                                    message: fileList,
                                    type: "img",
                                },
                            },
                        },
                        { new: true }
                    );
                    return res.json({
                        success: true,
                        fileList,
                    });
                }
            });
        } catch (err) {
            return returnServerError(res, err.message);
        }
    }
    // [POST] /api/chat/addMessage/:chatId
    public async addMessage(req: Request, res: Response): Promise<Response> {
        try {
            await newTextMessage(
                req.body.nickname,
                req.params.chatId,
                req.body.message
            );
            res.json({ success: true });
        } catch (err) {
            return returnServerError(res, err.message);
        }
    }
}

export default new ChatController();
