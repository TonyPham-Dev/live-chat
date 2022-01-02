import { getChatGfs } from "../config/db.config"
// import { chatUpload } from "../config/gridFsStorage.config"
import ChatModel from "../models/Chat.models"
interface Base {
    success: boolean
}
export const newChat: (users: string[]) => Promise<Base> = async ([
    ...users
]) => {
    try {
        const newChat = new ChatModel({
            users: [...users],
            messages: [],
        })
        await newChat.save()
        return { success: true }
    } catch (err) {
        return { success: false }
    }
}

interface NewMessage extends Base {
    chat?: any
}

export const newTextMessage: (
    nickname: string,
    roomId: string,
    message: string
) => Promise<NewMessage> = async (nickname, roomId, message) => {
    try {
        const chat = await ChatModel.findByIdAndUpdate(
            roomId,
            {
                $push: {
                    messages: {
                        user: nickname,
                        message: [message],
                        type: "text",
                    },
                },
            },
            {
                new: true,
            }
        )
        console.log(chat)
        return { success: true, chat }
    } catch (err) {
        console.log(err)
        return { success: false }
    }
}
