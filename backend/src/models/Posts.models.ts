import { Schema, model } from "mongoose"

const PostSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        imgList: [String],
        author: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

const PostModel = model("Post", PostSchema, "posts")

export default PostModel
