import { ErrorResponse, ErrorDetails, PushButtonLogCreationModel } from "../../models";

export const DeviceTokenValidation = (req: PushButtonLogCreationModel) => {

    const {
        type
    } = req;

    if (!type) {
        throw new ErrorResponse(
            400,
            "Bad Request",
            new ErrorDetails(
                "PostPushButtonLogError",
                "Validation Error",
                "Type is required"
            )
        );
    }

    if (type !== "BENCANA" && type !== "KEBAKARAN" && type !== "RUSUH") {
        throw new ErrorResponse(
            400,
            "Bad Request",
            new ErrorDetails(
                "PostPushButtonLogError",
                "Validation Error",
                "Type must be BENCANA, KEBAKARAN, or RUSUH"
            )
        );
    }

    return {
        type,
        userId: req.userId,
    };
}
