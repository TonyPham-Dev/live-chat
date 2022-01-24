import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
    {
        postId: String,
        commentList: [
            {
                author: String,
                content: String,
            },
        ],
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

const CommentModel = model("Comment", CommentSchema, "comments");

export default CommentModel;
