import { Application } from "express";
import postRoute from "./posts.routes";
import authRoute from "./auth.routes";
import commentRoute from "./comment.routes";
import mediaRoute from "./media.routes";
import chatRoute from "./chat.routes";
import userRoute from "./user.routes";
import followRoute from "./follow.routes";
import likeRoute from "./like.routes";

const routes = (app: Application) => {
    app.use("/api/posts", postRoute);
    app.use("/api/auth", authRoute);
    app.use("/api/comments", commentRoute);
    app.use("/api/media", mediaRoute);
    app.use("/api/chat", chatRoute);
    app.use("/api/user", userRoute);
    app.use("/api/follow", followRoute);
    app.use("/api/like", likeRoute);
};

export default routes;
