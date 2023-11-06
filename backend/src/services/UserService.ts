import { PrismaClient, Prisma } from "@prisma/client";
import { Request } from "express";
import { UserInputValidation, numberValidation } from ".";
import { ErrorResponse, ErrorDetails, UserModel } from "../models";
import { UserRecord, getAuth } from "firebase-admin/auth";

const prisma = new PrismaClient();


export const getUsersService = async (req: Request) => {
	return await prisma.user.findMany({
		where: {
			id: req.params.id ? parseInt(req.params.id) : undefined,
			uid: req.query.uid ? req.query.uid.toString() : undefined,
			name: req.query.name ? req.query.name.toString() : undefined,
			email: req.query.email ? req.query.email.toString() : undefined,
			NIP: req.query.NIP ? req.query.NIP.toString() : undefined,
			gender: req.query.gender ? req.query.gender.toString() as "L" | "P" : undefined,
			jabatan: req.query.jabatan ? req.query.jabatan.toString() : undefined,
			approved: req.query.approved ? (req.query.approved === 'true') : undefined,
			disabled: req.query.disabled ? (req.query.disabled === 'true') : undefined,
		},
		select: {
			id: true,
			uid: true,
			name: true,
			email: true,
			NIP: true,
			gender: true,
			jabatan: true,
			approved: true,
			disabled: true,
		},
	});
};

export const getUserByIdService = async (id: number | string): Promise<UserModel> => {
	id = numberValidation(id, "getUser", "User id");

	const user = await prisma.user.findUnique({
		where: {
			id: id
		},
		select: {
			id: true,
			uid: true,
			name: true,
			email: true,
			NIP: true,
			gender: true,
			jabatan: true,
			approved: true,
			disabled: true,
			roleId: true,
		},
	});
	if (!user) {
		throw new ErrorResponse(
			404,
			"Not Found",
			new ErrorDetails(
				"getUser",
				"User not found",
				`User with id ${id} not found`
			)
		);
	}
	return user;
};

export const getUserByUidService = async (uid: string | string): Promise<UserModel> => {

	const user = await prisma.user.findUnique({
		where: {
			uid: uid
		},
		select: {
			id: true,
			uid: true,
			name: true,
			email: true,
			NIP: true,
			gender: true,
			jabatan: true,
			approved: true,
			disabled: true,
		},
	});
	if (!user) {
		throw new ErrorResponse(
			404,
			"Not Found",
			new ErrorDetails(
				"getUser",
				"User not found",
				`User with uid ${uid} not found`
			)
		);
	}
	return user;
};

export const getUserByEmailService = async (email: string) => {
	return await prisma.user.findUnique({
		where: {
			email: email
		},
		select: {
			id: true,
			name: true,
			email: true,
			password: true,
			createdAt: true,
			updatedAt: true,
		},
	});
};

export const createUserService = async (req: Request) => {
	const {
		email,
		name,
		NIP,
		gender,
		jabatan,
		password,
		approved,
		roleId
	} = await UserInputValidation(req.body, "createUser");

	return getAuth().createUser({
		email: email,
		password: password,
		disabled: false
	}).then((UserRecord) => {
		return prisma.user.create({
			data: {
				name: name,
				email: UserRecord.email || email,
				password: UserRecord.passwordHash!,
				uid: UserRecord.uid,
				disabled: UserRecord.disabled,
				NIP: NIP,
				gender: gender,
				jabatan: jabatan,
				approved: approved,
				role: {
					connect: {
						id: roleId || 2
					}
				}
			}
		});
	}).catch((error) => {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			error = error as Prisma.PrismaClientKnownRequestError;
			throw new ErrorResponse(
				400,
				"Bad Request",
				new ErrorDetails(
					"PrismaClientKnownRequestError",
					"Error Saving to Database",
					error.meta.cause
				)
			);
		}
		throw new ErrorResponse(
			500,
			"Internal Server Error",
			new ErrorDetails(
				"createUser",
				"Create Error",
				error
			)
		);
	});
};

export const createRegistrationUserService = async (req: Request) => {
	const {
		email,
		name,
		NIP,
		gender,
		jabatan,
		password,
		roleId
	} = await UserInputValidation(req.body, "createUser");


	return await prisma.user.create({
		data: {
			name: name,
			email: email,
			password: password!,
			uid: null,
			disabled: false,
			NIP: NIP,
			gender: gender,
			jabatan: jabatan,
			approved: false,
			role: {
				connect: {
					id: roleId || 2
				}
			}
		}
	}).catch((error) => {
		throw new ErrorResponse(
			500,
			"Internal Server Error",
			new ErrorDetails(
				"createUser",
				"Create Error",
				error
			)
		);
	});
};

export const updateUserService = async (id: number | string, req: Request) => {
	const user = await getUserByIdService(id);

	const {
		email,
		name,
		NIP,
		gender,
		jabatan,
		password,
		roleId
	} = await UserInputValidation(req.body, "updateUser", true);
	return prisma.user.update({
		where: {
			id: user.id
		},
		data: {
			name: name,
			email:  email,
			password: password,
			NIP: NIP,
			gender: gender,
			jabatan: jabatan,
			role: {
				connect: {
					id: roleId
				}
			}
		}
	}).catch((error) => {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			error = error as Prisma.PrismaClientKnownRequestError;
			throw new ErrorResponse(
				400,
				"Bad Request",
				new ErrorDetails(
					"PrismaClientKnownRequestError",
					"Error Saving to Database",
					error.meta.cause
				)
			);
		}
		throw new ErrorResponse(
			500,
			"Internal Server Error",
			new ErrorDetails(
				"updateUser",
				"Update Error",
				error
			)
		);
	});
};

export const updateApprovedUserService = async (id: number | string, req: Request) => {
	const user = await getUserByIdService(id);

	if (!user.uid) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			new ErrorDetails(
				"updateUser",
				"Update Error",
				"User not approved yet, please contact admin"
			)
		);
	}

	const {
		email,
		name,
		NIP,
		gender,
		jabatan,
		password,
		approved,
		roleId
	} = await UserInputValidation(req.body, "updateUser", true);

	return await getAuth().updateUser(user.uid, {
		email: email,
		password: password,
	}).then((UserRecord) => {
		return prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				name: name,
				email: UserRecord.email || email,
				password: UserRecord.passwordHash,
				uid: UserRecord.uid,
				disabled: UserRecord.disabled,
				NIP: NIP,
				gender: gender,
				jabatan: jabatan,
				approved: approved,
				role: {
					connect: {
						id: roleId
					}
				}
			}
		});
	}).catch((error) => {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			error = error as Prisma.PrismaClientKnownRequestError;
			throw new ErrorResponse(
				400,
				"Bad Request",
				new ErrorDetails(
					"PrismaClientKnownRequestError",
					"Error Saving to Database",
					error.meta.cause
				)
			);
		}
		throw new ErrorResponse(
			500,
			"Bad Request",
			new ErrorDetails(
				"updateUser",
				"Update Error",
				error
			)
		);
	});
};

export const deleteUserService = async (id: number | string) => {
	const user = await getUserByIdService(id);

	return await prisma.user.delete({
		where: {
			id: user.id
		}
	});
};

export const deleteApprovedUserService = async (id: number | string) => {
	const user = await getUserByIdService(id);

	if (!user.uid || !user.approved) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			new ErrorDetails(
				"deleteUser",
				"Delete Error",
				"User not approved yet, please contact admin"
			)
		);
	}

	try {
		return await getAuth().deleteUser(user.uid).then(() => {
			return prisma.user.delete({
				where: {
					id: user.id
				}
			});
		});
	} catch (error : unknown) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			error = error as Prisma.PrismaClientKnownRequestError;
			throw new ErrorResponse(
				400,
				"Bad Request",
				new ErrorDetails(
					"PrismaClientKnownRequestError",
					"Error Saving to Database",
					// @ts-ignore
					error.meta.cause
				)
			);
		}


		throw new ErrorResponse(
			500,
			"Bad Request",
			new ErrorDetails(
				"deleteUser",
				"Delete Error",
				JSON.stringify(error)
			)
		);
	}
};

export const approveUserService = async (id: number | string) => {
	const user = await getUserByIdService(id);

	return getAuth().createUser({
		email: user.email,
		password: user.password,
		disabled: false
	}).then((UserRecord) => {
		return prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				uid: UserRecord.uid,
				approved: true,
				password: UserRecord.passwordHash,
			}
		});
	}).catch((error) => {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			error = error as Prisma.PrismaClientKnownRequestError;
			throw new ErrorResponse(
				400,
				"Bad Request",
				new ErrorDetails(
					"PrismaClientKnownRequestError",
					"Error Saving to Database",
					error.meta.cause
				)
			);
		}
		throw new ErrorResponse(
			500,
			"Internal Server Error",
			new ErrorDetails(
				"createApprovedUser",
				"Create Error",
				error
			)
		);
	});
};

export const setDisableUserService = async (id: number | string) => {
	const user = await getUserByIdService(id);

	if (!user.uid || !user.approved) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			new ErrorDetails(
				"deleteUser",
				"Delete Error",
				"User not approved yet, please contact admin"
			)
		);
	}

	return getAuth().updateUser(user.uid, {
		disabled: !user.disabled
	}).then((UserRecord) => {
		return prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				disabled: UserRecord.disabled,
			}
		});
	}).catch((error) => {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			error = error as Prisma.PrismaClientKnownRequestError;
			throw new ErrorResponse(
				400,
				"Bad Request",
				new ErrorDetails(
					"PrismaClientKnownRequestError",
					"Error Saving to Database",
					error.meta.cause
				)
			);
		}
		throw new ErrorResponse(
			500,
			"Internal Server Error",
			new ErrorDetails(
				"createApprovedUser",
				"Create Error",
				error
			)
		);
	});
};
