import { Request, Response, NextFunction } from "express";
import { getDeviceTokensService, getPushButtonLogService, postDeviceTokenService, postNotificationService } from "../services";
import { DataDetailResponse, DeviceTokenModel, SuccessResponse, UserAuthInfoRequest } from "../models";

export const getDeviceTokens = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deviceTokens = await getDeviceTokensService();
        const response = new SuccessResponse(
            200,
            "OK",
            new DataDetailResponse(
                "deviceTokens",
                deviceTokens
            )
        );

        res.status(response.code).json(response);
    }
    catch (error) {
        next(error);
    }
}

export const PostDeviceToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const message = await postDeviceTokenService(req);
        const response = new SuccessResponse<DeviceTokenModel>(
            200,
            "OK",
            new DataDetailResponse<DeviceTokenModel>(
                "deviceToken",
                message
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
        const PushButtonLog = await postNotificationService(req);
        const response = new SuccessResponse(
            200,
            "OK",
            new DataDetailResponse(
                "PushButtonLog",
                PushButtonLog
            )
        );
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
