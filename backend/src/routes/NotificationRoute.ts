import { adminOnly } from './../middleware/AdminOnly';
import express from "express";
import { GetPushButtonLogs, PostDeviceToken, PostNotification } from "../controllers";
import { verifyUser } from '../middleware';

const notificationRouter = express.Router();

notificationRouter.post("/deviceToken", verifyUser, PostDeviceToken);
notificationRouter.post("/notification", verifyUser, PostNotification);
notificationRouter.get("/pushButtonLogs", verifyUser, adminOnly, GetPushButtonLogs);

export { notificationRouter };
