import { Router } from "express"
import CommentController from "../controllers/comment.controller"

const router = Router()

router.get("/:postId", CommentController.getCommentFromPost)
router.post("/:postId", CommentController.addCommentToPost)

export default router
