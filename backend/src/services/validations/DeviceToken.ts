import { ErrorResponse, ErrorDetails } from "../../models";

export const DeviceTokenValidation = (req: { token: string }) => {
    const { token } = req;

    if (!token) {
        throw new ErrorResponse(
            400,
            "Bad Request",
            new ErrorDetails(
                "PostDeviceTokenError",
                "Validation Error",
                "Token is required"
            )
        );
    }

    return { token };
}
