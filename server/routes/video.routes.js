import express from "express";
import { endCall, startCall } from "../controllers/video.controller";

const router = express.Router();

router.post("/start", startCall);
router.post("/end", endCall);

export default router;
