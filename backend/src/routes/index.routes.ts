import { Application } from "express"
import postRoute from "./posts.routes"
import authRoute from "./auth.routes"
import commentRoute from "./comment.routes"
import imageRoute from "./images.routes"
import chatRoute from "./chat.routes"

const routes = (app: Application) => {
    app.use("/api/posts", postRoute)
    app.use("/api/auth", authRoute)
    app.use("/api/comments", commentRoute)
    app.use("/api/images", imageRoute)
    app.use("/api/chat", chatRoute)
}

export default routes
