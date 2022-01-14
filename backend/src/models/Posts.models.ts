import { Schema, model } from "mongoose";

const PostSchema = new Schema(
    {
        body: {
            type: String,
            required: true,
        },
        imgList: [String],
        vidList: [String],
        author: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const PostModel = model("Post", PostSchema, "posts");

export default PostModel;
