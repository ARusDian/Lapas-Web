import { PrismaClient } from "@prisma/client";
import { PushButtonLogCreationModel, DeviceTokenModel, UserAuthInfoRequest, ErrorResponse, ErrorDetails } from "../models";
import { DeviceTokenValidation } from "./validations/DeviceToken";
import admin from "firebase-admin";


const prisma = new PrismaClient();

export const postDeviceTokenService = async (req: UserAuthInfoRequest): Promise<DeviceTokenModel> => {
    const { token } = DeviceTokenValidation(req.body);

    if (req.userId === undefined) {
        throw new ErrorResponse(
            401,
            "Unauthorized",
            new ErrorDetails(
                "DeviceTokenErrorSave",
                "DeviceTokenError",
                "User not found, please login to continue"
            )
        );
    }
    
    const deviceToken = prisma.deviceToken.create({
        data: {
            deviceToken: token,
            userId: req.userId
        }
    });

    return deviceToken;
}

export const getDeviceTokensService = async () => { 

    return await prisma.deviceToken.findMany({
        select: {
            id: true,
            deviceToken: true,
            userId: true,
            createdAt: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            }
        }
    }).catch((error) => {
        if (error instanceof Error) {
            throw new ErrorResponse(
                400,
                "Bad Request",
                new ErrorDetails(
                    "GetDeviceTokensError",
                    "GetDeviceTokensError",
                    error.message
                )
            );
        }
    });
}

export const postNotificationService = async (req: UserAuthInfoRequest) => {
    const { type, userId } = req.body;

    if (!type) {
        throw new ErrorResponse(
            400,
            "Bad Request",
            new ErrorDetails(
                "NotificationError",
                "NotificationError",
                "Type is required"
            )
        );
    }

    if (!userId) {
        throw new ErrorResponse(
            400,
            "Bad Request",
            new ErrorDetails(
                "NotificationError",
                "NotificationError",
                "User not found, please login to continue"
            )
        );
    }

    const deviceTokens = await prisma.deviceToken.findMany({
        select: {
            deviceToken: true
        }
    });

    const registrationTokens = deviceTokens.map(token => token.deviceToken as string);

    const payload = {
        notification: {
            title: type,
            body: "Button pushed"
        },
        tokens: registrationTokens
    }

    const response = await admin.messaging().sendMulticast(payload)

    const pushButtonLog = await prisma.pushButtonLog.create({
        data: {
            type: type,
            userId: userId ? userId : 1
        }
    });

    return {
        data: pushButtonLog,
        response: response,
        tokens: registrationTokens
    }
}

export const getPushButtonLogService = async (req: UserAuthInfoRequest) => {

    return await prisma.pushButtonLog.findMany({
        select: {
            id: true,
            type: true,
            userId: true,
            createdAt: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            }
        }
    }).catch((error) => {
        if (error instanceof Error) {
            throw new ErrorResponse(
                400,
                "Bad Request",
                new ErrorDetails(
                    "GetPushButtonLogsError",
                    "GetPushButtonLogsError",
                    error.message
                )
            );
        }
    });
}
