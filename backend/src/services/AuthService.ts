import { Request } from "express";
import { createRegistrationUserService, createUserService, getUserByEmailService, getUserByIdService, getUserByUidService } from ".";
import { ErrorDetails, ErrorResponse, FirebaseAuthError } from "../models";
import { getAuth } from "firebase-admin/auth";
import { FirebaseError } from "firebase-admin";
import { instanceOfType } from "../utils/helper";

export const registerService = async (req: Request) => {
	const { name, email, password, confirmPassword } = req.body;
	if (!name || !email || !password || !confirmPassword) {
		let empty = "";
		if (!name) empty += "name, ";
		if (!email) empty += "email, ";
		if (!password) empty += "password, ";
		if (!confirmPassword) empty += "confirmPassword, ";
		throw new ErrorResponse(
			400,
			"Bad Request",
			new ErrorDetails(
				"RegisterError",
				"Validation Error",
				"All fields are required :" + empty.slice(0, -2)
			)
		);
	}

	if (password.length < 8) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			new ErrorDetails(
				"RegisterError",
				"Validation Error",
				"Password must be at least 6 characters"
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
			if (instanceOfType<FirebaseAuthError>(error) && error.errorInfo) {
				console.log("error");
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
			throw new ErrorResponse(
				500,
				"Internal Server Error",
				new ErrorDetails(
					"VerifyUserError",
					"Internal Server Error",
					(error as FirebaseError).message || "Something wrong went verifying token"
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
