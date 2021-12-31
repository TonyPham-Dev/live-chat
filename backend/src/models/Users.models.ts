import { Schema, model } from "mongoose"

const UserSchema = new Schema({
    nickname: { type: String, required: true },
    avatar: { type: String, required: true },
})

UserSchema.virtual("posts", {
    ref: "Post",
    localField: "nickname",
    foreignField: "author",
})

const UserModel = model("User", UserSchema, "users")

export default UserModel
