import { adminOnly } from './../middleware/AdminOnly';
import express from "express";
import { GetPushButtonLogs, PostDeviceToken, PostNotification } from "../controllers";
import { verifyUser } from '../middleware';

const notificationRouter = express.Router();

notificationRouter.post("/deviceToken", PostDeviceToken);
notificationRouter.post("/notification", PostNotification);
notificationRouter.get("/pushButtonLogs", verifyUser, adminOnly, GetPushButtonLogs);

export { notificationRouter };
