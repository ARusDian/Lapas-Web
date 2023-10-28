import { Request, Response, NextFunction } from "express";
import {
	registerService,
	authenticatedService
} from "../services";
import { DataDetailResponse, SuccessResponse, UserModel } from "../models";

interface AuthData {
	token: string;
	data: {
		name: string;
		email: string;
	};
}

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const authToken = await registerService(req);
		const response = new SuccessResponse<AuthData>(
			200,
			"OK",
			new DataDetailResponse<any>(
				"register",
				authToken
			)
		);
		res.status(response.code).json(response);
		return;	}
	catch (error) {
		next(error);
	}
};

export const authenticatedUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await authenticatedService(req);
		const response = new SuccessResponse<UserModel>(
			200,
			"OK",
			new DataDetailResponse<UserModel>(
				"users",
				user
			)
		);
		res.status(response.code).json(response);
		return;
	}
	catch (error) {
		next(error);
	}
};
