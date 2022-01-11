import { newTextMessage } from "./../services/message.services";
import { Request, Response } from "express";
import { chatUpload } from "../config/gridFsStorage.config";
import { returnServerError } from "../app/constants";
import ChatModel from "../models/Chat.models";
import { getUserData } from "../services/auth.services";
import { newChat } from "../services/message.services";
import axios from "axios";
import variables from "../config/variables.config";

class ChatController {
    // [GET] /chat
    // @desc Get all chat
    public async getAll(req: Request, res: Response) {
        try {
            const userData = await getUserData(
                req.headers.authorization.split(" ")[1]
            );
            const chats = await ChatModel.find({
                users: userData.nickname,
            }).sort({ updatedAt: -1 });
            return res.json(chats);
        } catch (err) {
            return returnServerError(res, err.message);
        }
    }
    // [POST] /chat/new
    // @desc Create new chat conversation
    public async newChat(req: Request, res: Response) {
        try {
            const userData = await getUserData(
                req.headers.authorization.split(" ")[1]
            );
            const { users } = req.body;
            const newConversation = await newChat([
                userData.nickname,
                ...users,
            ]);
            if (newConversation.success) {
                return res.json({
                    success: true,
                });
            }
            return res.json({
                success: false,
            });
        } catch (err) {
            return returnServerError(res, err.message);
        }
    }
    // [POST] /chat/img/:chatId
    public async newImg(req: Request, res: Response) {
        try {
            chatUpload(req, res, async (err) => {
                if (err) {
                    return returnServerError(res, err.message);
                } else {
                    let fileList: string[] = [];
                    if (req.files && req.files.length > 0) {
                        const files: Express.Multer.File[] = Array.isArray(
                            req.files
                        ) && [...req.files];
                        files.forEach((file) => {
                            fileList.push(`/images/chat/${file.filename}`);
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

                    await ChatModel.findByIdAndUpdate(
                        req.params.chatId,
                        {
                            $push: {
                                messages: {
                                    user: userInfoFromAuth0.nickname,
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
    public async addMessage(req: Request, res: Response) {
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
