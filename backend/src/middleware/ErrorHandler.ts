import { ErrorDetails, ErrorResponse, FirebaseAuthError } from "../models";
import { NextFunction, Request, Response } from "express";
import * as logger from "./Logger";
import { instanceOfType } from "../utils/helper";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (error: Error | typeof ErrorResponse, request: Request, response: Response, _next: NextFunction) => {

	if (error instanceof ErrorResponse) {
		response.status(error.code).json(error);
		return;
	}

	// logger.error("errorHandler: ", error);'
	console.log("errorHandler: ", error);
	response.status(500).json(
		{
			name: error.name,
			message: "Internal Server Error",
			details : error
		}
	);
};

export const unknownEndpoint = (_request: Request, _response: Response, next: NextFunction) => {
	throw new ErrorResponse(
		404,
		"Unknown Endpoint",
		new ErrorDetails(
			"NotFoundError",
			"NotFoundError",
			"Unknown Endpoint"
		)
	);
};

export const PrismaErrorHandler = (err: Error | typeof ErrorResponse, _request: Request, _response: Response, next: NextFunction) => {
	// @ts-ignore
	console.log("PrismaErrorHandler: ", err.errorInfo, instanceOfType<FirebaseAuthError>(err));
	if (err instanceof Error && err.name === "PrismaClientKnownRequestError") {
		throw new ErrorResponse(
			400,


			
			"Bad Request",
			new ErrorDetails(
				"PrismaClientKnownRequestError",
				"PrismaClientKnownRequestError",
				err.message
			)
		);
	}
	// @ts-ignore
	if (err.errorInfo) {
		// @ts-ignore
		switch (err.errorInfo.code) {
			case "auth/argument-error":
				throw new ErrorResponse(
					401,
					"Unauthorized",
					new ErrorDetails(
						"ArgumentError",
						"ArgumentError",
						"Invalid token"
					)
				);

			case "auth/id-token-expired":
				throw new ErrorResponse(
					401,
					"Unauthorized",
					new ErrorDetails(
						"TokenExpired",
						"TokenExpired",
						"Token expired please login again"
					)
				);
			case "auth/id-token-revoked":
				throw new ErrorResponse(
					401,
					"Unauthorized",
					new ErrorDetails(
						"TokenRevoked",
						"TokenRevoked",
						"Token revoked please login again"
					)
				);
			case "auth/invalid-argument":
				throw new ErrorResponse(
					401,
					"Unauthorized",
					new ErrorDetails(
						"InvalidArgument",
						"InvalidArgument",
						"Invalid token"
					)
				);
			case "auth/invalid-claims":
				throw new ErrorResponse(
					401,
					"Unauthorized",
					new ErrorDetails(
						"InvalidClaims",
						"InvalidClaims",
						"Invalid token"
					)
				);
			case "auth/invalid-creation-time":
				throw new ErrorResponse(
					401,
					"Unauthorized",
					new ErrorDetails(
						"InvalidCreationTime",
						"InvalidCreationTime",
						"Invalid token"
					)
				);
			default
				:
				throw new ErrorResponse(
					401,
					"Unauthorized",
					new ErrorDetails(
						"InvalidToken",
						"InvalidToken",
						"Invalid token"
					)
				);
		}

	}
	next(err);
}
