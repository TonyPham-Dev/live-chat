import { Schema, model } from "mongoose"

const ChatSChema = new Schema(
    {
        users: [String],
        messages: [
            {
                user: String,
                message: [String],
                type: { type: String, enum: ["text", "img"], default: "text" },
                createdAt: { type: Date, default: Date.now },
            },
        ],
    },
    { timestamps: true }
)

const ChatModel = model("Chat", ChatSChema, "chats")

export default ChatModel
