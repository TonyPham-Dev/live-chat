import { Router } from "express"
import PostController from "../controllers/post.controller"

const router = Router()

router.get("/:postId", PostController.getFromPostId)
router.post("/new", PostController.newPost)

export default router
