import { Request } from "express";
import { createRegistrationUserService, createUserService, getUserByEmailService, getUserByIdService, getUserByUidService } from ".";
import { ErrorDetails, ErrorResponse } from "../models";
import { getAuth } from "firebase-admin/auth";
import { FirebaseError } from "firebase-admin";

export const registerService = async (req: Request) => {
	const { name, email, password, confirmPassword } = req.body;
	if (!name || !email || !password || !confirmPassword) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			new ErrorDetails(
				"RegisterError",
				"Validation Error",
				"All fields are required"
			)
		);
	}
	if (password !== confirmPassword) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			new ErrorDetails(
				"RegisterError",
				"Validation Error",
				"Passwords do not match"
			)
		);
	}

	const user = await getUserByEmailService(email);
	if (user) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			new ErrorDetails(
				"RegisterError",
				"Validation Error",
				"User already exists"
			)
		);
	}
	const newUser = await createRegistrationUserService(req);
	if (!newUser) {
		throw new ErrorResponse(
			500,
			"Internal Server Error",
			new ErrorDetails(
				"RegisterError",
				"Internal Server Error",
				"Something wrong went creating user"
			)
		);
	}
	return { data: { name: newUser.name, email: newUser.email } };
};

export const authenticatedService = async (req: Request) => {
	const token = req.get("authorization");
	if (!token) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			{
				name: "AuthenticatedError",
				message: "Validation Error",
				details: "Token is required"
			}
		);
	}

	const verifyToken = (token: string) => {
		try {
			return getAuth().verifyIdToken(token);
		} catch (error: unknown) {
			throw new ErrorResponse(
				401,
				"Unauthorized",
				new ErrorDetails(
					"VerifyUserError",
					(error as FirebaseError).code || "Token Error",
					(error as FirebaseError).message || "Invalid token"
				)
			);
		}
	};

	const decodedToken = await verifyToken(token.split(" ")[1]);

	const uid = decodedToken.uid;

	const user = await getUserByUidService(uid);
	if (!user) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			{
				name: "AuthenticatedError",
				message: "Validation Error",
				details: "User does not exist"
			}
		);
	}
	return user;
};
