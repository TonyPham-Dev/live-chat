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
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

PostSchema.virtual("comment", {
    ref: "Comment",
    localField: "_id",
    foreignField: "postId",
});

PostSchema.virtual("like", {
    ref: "Like",
    localField: "_id",
    foreignField: "postId",
});

PostSchema.virtual("userInfo", {
    ref: "User",
    localField: "author",
    foreignField: "nickname",
});

const PostModel = model("Post", PostSchema, "posts");

export default PostModel;
