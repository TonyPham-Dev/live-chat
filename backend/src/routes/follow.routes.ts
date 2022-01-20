import { Router } from "express";
import FollowController from "../controllers/follow.controller";

const router = Router();

router.get("/:user", FollowController.index);
router.get("/toggle/:user", FollowController.toggleFollow);

export default router;
