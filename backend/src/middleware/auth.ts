import { Response, NextFunction } from "express";
import { getUserByUidService } from "../services";
import { ErrorResponse, ErrorDetails, UserAuthInfoRequest } from "../models";
import { getAuth, } from "firebase-admin/auth";
import { FirebaseError } from 'firebase-admin';

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

		if (!user) {
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
		req.roleId = user.role?.id;
		next();

	} catch (error) {
		next(error);
	}
};
