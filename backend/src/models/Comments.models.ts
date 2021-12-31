import { Schema, model } from "mongoose"

const CommentSchema = new Schema({
    postId: String,
    commentList: [
        {
            author: String,
            content: String,
        },
    ],
})

const CommentModel = model("Comment", CommentSchema, "comments")

export default CommentModel
