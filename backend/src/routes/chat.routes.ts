import { Router } from "express"
import ChatController from "../controllers/chat.controller"

const router = Router()

router.get("/", ChatController.getAll)
router.post("/new", ChatController.newChat)
router.delete("/:chatId", ChatController.deleteChat)
router.post("/img/:chatId", ChatController.newImg)

export default router
