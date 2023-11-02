import express from "express";
import { PostDeviceToken, PostNotification } from "../controllers";

const notificationRouter = express.Router();

notificationRouter.post("/deviceToken", PostDeviceToken);
notificationRouter.post("/notification", PostNotification);

export { notificationRouter };
