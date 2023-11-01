import { Response, NextFunction } from "express";
import { getUserByUidService } from "../services";
import { ErrorResponse, ErrorDetails, UserAuthInfoRequest, FirebaseAuthError } from "../models";
import { getAuth } from "firebase-admin/auth";
import { instanceOfType } from "../utils/helper";

export const verifyUser = async (req: UserAuthInfoRequest, res: Response, next: NextFunction) => {
	try {
		const token = req.get("authorization");
		if (!token || !token.toLowerCase().startsWith("bearer ")) {
			throw new ErrorResponse(
				401,
				"Unauthorized",
				new ErrorDetails(
					"VerifyUserError",
					"Token Error",
					"Please login to continue"
				)
			);
		}


		const verifyToken = (token: string) => {
			try {
				return getAuth().verifyIdToken(token);
			} catch (error: unknown) {
				if (instanceOfType<FirebaseAuthError>(error) && error.errorInfo) {
					switch (error.errorInfo.code) {
						case "auth/argument-error":
							throw new ErrorResponse(
								401,
								"Unauthorized",
								new ErrorDetails(
									"VerifyUserError",
									error.errorInfo.code || "Token Error",
									error.errorInfo.message || "Invalid token"
								)
							);

						case "auth/id-token-expired":
							throw new ErrorResponse(
								401,
								"Unauthorized",
								new ErrorDetails(
									"VerifyUserError",
									error.errorInfo.code || "Token Error",
									error.errorInfo.message || "Token expired"
								)
							);
						case "auth/id-token-revoked":
							throw new ErrorResponse(
								401,
								"Unauthorized",
								new ErrorDetails(
									"VerifyUserError",
									error.errorInfo.code || "Token Error",
									error.errorInfo.message || "Token revoked"
								)
							);
						case "auth/invalid-argument":
							throw new ErrorResponse(
								401,
								"Unauthorized",
								new ErrorDetails(
									"VerifyUserError",
									error.errorInfo.code || "Token Error",
									error.errorInfo.message || "Invalid token"
								)
							);
						case "auth/invalid-claims":
							throw new ErrorResponse(
								401,
								"Unauthorized",
								new ErrorDetails(
									"VerifyUserError",
									error.errorInfo.code || "Token Error",
									error.errorInfo.message || "Invalid token"
								)
							);
						case "auth/invalid-creation-time":
							throw new ErrorResponse(
								401,
								"Unauthorized",
								new ErrorDetails(
									"VerifyUserError",
									error.errorInfo.code || "Token Error",
									error.errorInfo.message || "Invalid token"
								)
							);
						default
							:
							throw new ErrorResponse(
								401,
								"Unauthorized",
								new ErrorDetails(
									"VerifyUserError",
									error.errorInfo.code || "Token Error",
									error.errorInfo.message || "Invalid token"
								)
							);
					}
				}
				throw new ErrorResponse(
					401,
					"Internal Server Error",
					new ErrorDetails(
						"VerifyUserError",
						"Internal Server Error",
						"Something wrong went verifying token"
					)
				);

			}
		};

		const decodedToken = await verifyToken(token.split(" ")[1]);

		if (!decodedToken || !decodedToken.uid) {
			throw new ErrorResponse(
				401,
				"Unauthorized",
				new ErrorDetails(
					"VerifyUserError",
					"Token Error",
					"Invalid token"
				)
			);
		}

		const user = await getUserByUidService(decodedToken.uid);

		if (!user || !user.id || !user.uid) {
			throw new ErrorResponse(
				401,
				"Unauthorized",
				new ErrorDetails(
					"VerifyUserError",
					"Athentication Error",
					"User does not exist"
				)
			);
		}
		req.userId = user.id;
		req.userUid = user.uid;
		req.userDeviceToken = user.deviceToken;
		req.roleId = user.role?.id;
		next();

	} catch (error) {
		next(error);
	}
};
