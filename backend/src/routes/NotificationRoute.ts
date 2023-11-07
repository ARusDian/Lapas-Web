import { adminOnly } from './../middleware/AdminOnly';
import express from "express";
import { GetPushButtonLogs, PostDeviceToken, PostNotification, getDeviceTokens } from "../controllers";
import { verifyUser } from '../middleware';

const notificationRouter = express.Router();

notificationRouter.get("/deviceToken", verifyUser, adminOnly, getDeviceTokens);
notificationRouter.post("/deviceToken", verifyUser, PostDeviceToken);
notificationRouter.post("/notification", verifyUser, PostNotification);
notificationRouter.get("/pushButtonLogs", verifyUser, adminOnly, GetPushButtonLogs);

export { notificationRouter };
