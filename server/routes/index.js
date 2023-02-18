import express from "express";
import userRoute from "./user.route.js";
import chatRoute from "./chat.route.js";

const router = express.Router();

router.use("/users", userRoute);
router.use("/chats", chatRoute);

export default router;