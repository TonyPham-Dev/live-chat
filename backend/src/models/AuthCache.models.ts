import { Schema, model } from "mongoose";

const AuthCacheSchema = new Schema({
    token: String,
    userData: {
        create_at: String,
        email: String,
        email_verified: Boolean,
        family_name: String,
        given_name: String,
        identities: [
            {
                access_token: String,
                connection: String,
                expires_in: String,
                isSocial: Boolean,
                provider: String,
                user_id: String,
            },
        ],
        last_ip: String,
        last_login: String,
        locale: String,
        logins_count: Number,
        name: String,
        nickname: String,
        picture: String,
        updated_at: String,
        user_id: String,
    },
    createdAt: { type: Date, required: true, default: Date.now },
});

const AuthCacheModel = model("AuthCache", AuthCacheSchema, "authCache");

export default AuthCacheModel;
