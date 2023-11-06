import { ErrorDetails, ErrorResponse, FirebaseAuthError } from "../models";
import { NextFunction, Request, Response } from "express";
import * as logger from "./Logger";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (error: Error | typeof ErrorResponse, request: Request, response: Response, _next: NextFunction) => {
	
	if (error instanceof ErrorResponse) {
		response.status(error.code).json(error);
		return;
	}

	// logger.error("errorHandler: ", error);'

	response.status(500).json(
		{
			name: error.name,
			message: "Internal Server Error"
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

export const PrismaErrorHandler = (err: Error, _request: Request, _response: Response, next: NextFunction) => {
	console.log("PrismaErrorHandler: ", err);
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
	next(err);
}
