import { PrismaClient } from "@prisma/client";
import { PushButtonLogCreationModel, DeviceTokenModel, UserAuthInfoRequest } from "../models";
import { DeviceTokenValidation } from "./validations/DeviceToken";
import admin from "firebase-admin";


const prisma = new PrismaClient();

export const postDeviceTokenService = async (req: UserAuthInfoRequest): Promise<string> => {
    const { token } = DeviceTokenValidation(req.body);
    
    const deviceToken = prisma.deviceToken.create({
        data: {
            deviceToken: token,
            // TODO: FIX LATER
            userId: 1
        }
    });
    // @ts-ignore
    return deviceToken;
}

export const postNotificationService = async (req: UserAuthInfoRequest) => {
    const { type, userId } = req.body;

    const deviceTokens = await prisma.deviceToken.findMany({
        select: {
            deviceToken: true
        }
    });

    const registrationTokens = deviceTokens.map(token => token.deviceToken as string);

    const payload = {
        notification: {
            title: "KEBAKARAN",
            body: "Pak Bowo Keren"
        },
        tokens: registrationTokens
    }

    console.log(registrationTokens);


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
