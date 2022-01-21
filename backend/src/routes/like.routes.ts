import { Router } from "express";
import LikeController from "../controllers/like.controller";

const router = Router();

router.get("/:postId", LikeController.index);
router.post("/toggle/:postId", LikeController.toggle);

export default router;
