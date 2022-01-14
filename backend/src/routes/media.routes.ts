import { Router } from "express";
import ImageController from "../controllers/media.controller";

const router = Router();

router.get("/:filename", ImageController.filename);
router.get("/chat/:filename", ImageController.chatImg);

export default router;
