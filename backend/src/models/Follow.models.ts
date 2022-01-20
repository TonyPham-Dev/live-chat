import { Schema, model } from "mongoose";

const FollowSchema = new Schema({
    user: String,
    following: [String],
    followed: [String],
});

const FollowModel = model("Follow", FollowSchema, "follows");

export default FollowModel;
