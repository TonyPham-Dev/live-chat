import { Router } from "express";
import PostController from "../controllers/post.controller";

const router = Router();

router.get("/:postId", PostController.getFromPostId);
router.post("/new", PostController.newPost);
router.put("/edit/:postId", PostController.editPost);
router.delete("/del:postId", PostController.deletePost);

export default router;
