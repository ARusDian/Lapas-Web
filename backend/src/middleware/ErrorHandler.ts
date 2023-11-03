import { ErrorResponse, FirebaseAuthError } from "../models";
import { NextFunction, Request, Response } from "express";
import * as logger from "./Logger";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (error: Error | typeof ErrorResponse, request: Request, response: Response, _next: NextFunction) => {
	if (error instanceof ErrorResponse) {
		response.status(error.code).json(error);
		return;
	}

	// logger.error("errorHandler: ", error);'
	// @ts-ignore
	// if (error.errorInfo !== undefined || error instanceof FirebaseAuthError) {
	// 	// @ts-ignore
	// 	const firebaseErrorCode = error.errorInfo.code;
	// 	let errorInfo = {
	// 		name: "VerifyUserError",
	// 		message: "Token Error",
	// 		details: "Invalid token"
	// 	};

	// 	switch (firebaseErrorCode) {
	// 		case "auth/argument-error":
	// 			errorInfo = {
	// 				name: "VerifyUserError",
	// 				message: "Token Error",
	// 				details: "Please login to continue"
	// 			};
	// 			break;

	// 		case "auth/id-token-expired":
	// 			errorInfo = {
	// 				name: "VerifyUserError",
	// 				message: "Token Error",
	// 				details: "Token expired"
	// 			};
	// 			break;

	// 		case "auth/id-token-revoked":
	// 			errorInfo = {
	// 				name: "VerifyUserError",
	// 				message: "Token Error",
	// 				details: "Token revoked"
	// 			};
	// 			break;

	// 		case "auth/invalid-argument":
	// 			errorInfo = {
	// 				name: "VerifyUserError",
	// 				message: "Token Error",
	// 				details: "Invalid token"
	// 			};
	// 			break;

	// 		case "auth/invalid-claims":
	// 			errorInfo = {
	// 				name: "VerifyUserError",
	// 				message: "Token Error",
	// 				details: "Invalid token"
	// 			};
	// 			break;

	// 		case "auth/invalid-creation-time":
	// 			errorInfo = {
	// 				name: "VerifyUserError",
	// 				message: "Token Error",
	// 				details: "Invalid token"
	// 			};
	// 			break;

	// 		default:
	// 			errorInfo = {
	// 				name: "VerifyUserError",
	// 				message: "Token Error",
	// 				details: "Invalid token"
	// 			};
	// 	}
	// 	response.status(401).json(
	// 		new ErrorResponse(
	// 			401,
	// 			"Unauthorized",
	// 			errorInfo
	// 		)
	// 	);
	// 	return;

	// }




	response.status(500).json(
		{
			name: error.name,
			message: "Internal Server Error"
		}
	);
};
