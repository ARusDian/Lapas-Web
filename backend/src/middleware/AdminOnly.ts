import { Response, NextFunction } from "express";
import { getRolesService, getUserByIdService } from "../services";
import { ErrorResponse, ErrorDetails, UserAuthInfoRequest } from "../models";


export const adminOnly = async (req: UserAuthInfoRequest, res: Response, next: NextFunction) => {
	try {
		const role = await getRole(req);

		const roles = await getRolesService();

		const adminRole = roles.find((role) => role.name === "admin");
		
		if (role !== adminRole?.id) { 
			throw new ErrorResponse(
				401,
				"Unauthorized",
				new ErrorDetails(
					"AdminOnly",
					"AdminOnly",
					"User is not authorized to access this resource"
				)
			);
		}

		next();
	} catch (error) {
		next(error);
	}
};

const getRole = async (req: UserAuthInfoRequest) => {
	if (req.roleId) {
		return req.roleId;
	}
	if (!req.userId) {
		throw new ErrorResponse(
			401,
			"Unauthorized",
			new ErrorDetails(
				"Unauthorized",
				"AdminOnly",
				"User is not authorized to access this resource"
			)
		);
	}
	if (req.userId) {
		const user = await getUserByIdService(req.userId);
		console.log(user);
		if (user) {
			return user.roleId;
		}
	}
	return undefined;
};
