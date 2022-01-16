import { Router } from "express";
import UserController from "../controllers/user.controller";

const router = Router();

router.get("/:username", UserController.getUser);
router.get("/friends/:username", UserController.getFriends);
router.get("/search/:username", UserController.getSearch);

export default router;
