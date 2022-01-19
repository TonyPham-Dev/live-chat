import ChatModel from "../models/Chat.models";
interface Base {
    success: boolean;
}
interface NewChat extends Base {
    success: boolean;
    err?: string;
    chat?: any;
}
export const newChat: (users: string[]) => Promise<NewChat> = async ([
    ...users
]) => {
    try {
        const newChat = new ChatModel({
            users: [...users],
            messages: [],
        });
        await newChat.save();
        return { success: true, chat: newChat };
    } catch (err) {
        return { success: false, err: err.message };
    }
};

interface NewMessage extends Base {
    chat?: any;
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
        );
        return { success: true, chat };
    } catch (err) {
        return { success: false };
    }
};
