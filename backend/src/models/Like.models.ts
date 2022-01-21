import { Schema, model } from "mongoose";

const LikeSchema = new Schema({
    postId: String,
    likeList: [String],
    likeCount: Number,
});

const Like = model("Like", LikeSchema, "likes");

export default Like;
