import { Router } from "express";
import PostController from "../controllers/post.controller";

const router = Router();

router.get("/", PostController.index);
router.get("/:postId", PostController.getFromPostId);
router.post("/new", PostController.newPost);
router.put("/:postId", PostController.editPost);
router.delete("/:postId", PostController.deletePost);

export default router;
