import { Request, Response, NextFunction } from "express";
import { getPushButtonLogService, postDeviceTokenService, postNotificationService } from "../services";
import { DataDetailResponse, SuccessResponse, UserAuthInfoRequest } from "../models";

export const PostDeviceToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const message = await postDeviceTokenService(req);
        const response = new SuccessResponse<{
            message: string
        }>(
            200,
            "OK",
            new DataDetailResponse<{
                message: string
            }>(
                "deviceToken",
                {
                    message: message
                }
            )
        );
        res.status(response.code).json(response);
    }
    catch (error) {
        next(error);
    }
}

export const PostNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const  PushButtonLog = await postNotificationService(req);
        return res.status(200).json(PushButtonLog);
    }
    catch (error) {
        next(error);
    }
}

export const GetPushButtonLogs = async (req: UserAuthInfoRequest, res: Response, next: NextFunction) => {
    try {
        const PushButtonLog = await getPushButtonLogService(req);
        const response = new SuccessResponse(
            200,
            "OK",
            new DataDetailResponse(
                "PushButtonLog",
                PushButtonLog
            )
        );

        res.status(response.code).json(response);
    }
    catch (error) {
        next(error);
    }
}
