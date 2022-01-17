import { Router } from "express";
import ChatController from "../controllers/chat.controller";

const router = Router();

router.get("/", ChatController.getAll);
router.get("/:chatId", ChatController.getChat);
router.post("/new", ChatController.newChat);
router.post("/img/:chatId", ChatController.newImg);
router.post("/addMessage/:chatId", ChatController.addMessage);

export default router;
