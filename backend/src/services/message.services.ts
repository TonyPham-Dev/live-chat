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
    message: string,
    nickname: string,
    roomId: string
) => Promise<NewMessage> = async (message, nickname, roomId) => {
    try {
        const chat = await ChatModel.findByIdAndUpdate(
            roomId,
            {
                $push: {
                    messages: {
                        user: nickname,
                        message,
                        type: "text",
                        createdAt: new Date(),
                    },
                },
            },
            {
                new: true,
            }
        )
        return { success: true, chat }
    } catch (err) {
        return { success: false }
    }
}
