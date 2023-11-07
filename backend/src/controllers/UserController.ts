import { DataDetailResponse, SuccessResponse, UserModel } from "../models";
import {
	getUsersService,
	getUserByIdService,
	deleteUserService,
	createUserService,
	updateUserService,
	deleteApprovedUserService,
	setDisableUserService,
	approveUserService,
	updateApprovedUserService,
	updateUserProfileService,
} from "../services";
import { Request, Response, NextFunction } from "express";

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const users = await getUsersService(req);
		const response = new SuccessResponse<UserModel[]>(
			200,
			"OK",
			new DataDetailResponse<UserModel[]>(
				"users",
				users as UserModel[]
			)
		);
		res.status(response.code).json(response);
		return;
	}
	catch (error) {
		next(error);
	}
};


export const createUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await createUserService(req);
		const response = new SuccessResponse<UserModel>(
			201,
			"Created",
			new DataDetailResponse<UserModel>(
				"users",
				user as unknown as UserModel
			)
		);
		res.status(response.code).json(response);
		return;
	}
	catch (error) {
		next(error);
	}
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await getUserByIdService(req.params.id);
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

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const updatedUser = await updateUserService(Number(req.params.id), req) as UserModel;
		const response = new SuccessResponse<UserModel>(
			200,
			"OK",
			new DataDetailResponse<UserModel>(
				"users",
				updatedUser
			)
		);
		res.status(response.code).json(response);
		return;
	}
	catch (error) {
		next(error);
	}
};

export const updateUserProfile = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const updatedUser = await updateUserProfileService(Number(req.params.id), req) as UserModel;
		const response = new SuccessResponse<UserModel>(
			200,
			"OK",
			new DataDetailResponse<UserModel>(
				"users",
				updatedUser
			)
		);
		res.status(response.code).json(response);
		return;
	}
	catch (error) {
		next(error);
	}
}

export const updateApprovedUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const updatedUser = await updateApprovedUserService(Number(req.params.id), req) as UserModel;
		const response = new SuccessResponse<UserModel>(
			200,
			"OK",
			new DataDetailResponse<UserModel>(
				"users",
				updatedUser
			)
		);
		res.status(response.code).json(response);
		return;
	}
	catch (error) {
		next(error);
	}
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await deleteUserService(Number(req.params.id)) as UserModel;
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

export const approveUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await approveUserService(Number(req.params.id)) as unknown as UserModel;
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
}

export const deleteApprovedUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await deleteApprovedUserService(Number(req.params.id)) as UserModel;
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
}

export const setDisableUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await setDisableUserService(req.params.id);
		const response = new SuccessResponse<UserModel>(
			200,
			"OK",
			new DataDetailResponse<UserModel>(
				"users",
				user
			)
		);
		return res.status(response.code).json(response);
	} catch (error) {
		next(error);
	}
}
