import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    nickname: { type: String, required: true },
    avatarUrl: { type: String, required: true },
    fullName: { type: String, required: true },
});

UserSchema.virtual("posts", {
    ref: "Post",
    localField: "nickname",
    foreignField: "author",
});

UserSchema.virtual("users", {
    ref: "Follow",
    localField: "nickname",
    foreignField: "user",
});

const UserModel = model("User", UserSchema, "users");

export default UserModel;
