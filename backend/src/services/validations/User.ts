import { BaseUserModel, ErrorDetails, ErrorResponse } from "../../models";
import { getUserByEmailService } from "../UserService";

export const UserInputValidation = async (newUser: BaseUserModel, errorName: string, includePassword: boolean = false) => {
	const { name, email, password, roleId, NIP, gender, jabatan, approved } = newUser;
	if (!name || !email || !NIP || !gender || !jabatan || !password) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			new ErrorDetails(
				errorName,
				"Validation Error",
				"All fields are required"
			)
		);
	}

	if (!email.includes("@")) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			new ErrorDetails(
				errorName,
				"Validation Error",
				"Invalid email"
			)
		);
	}
	if (gender != "L" && gender != "P") {
		throw new ErrorResponse(
			400,
			"Bad Request",
			new ErrorDetails(
				errorName,
				"Validation Error",
				"Invalid Gender: L or P"
			)
		);
	}

	if (password.length < 8) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			new ErrorDetails(
				errorName,
				"Validation Error",
				"Password must be at least 8 characters"
			)
		);
	}

	const user = await getUserByEmailService(email);
	if (user) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			new ErrorDetails(
				errorName,
				"Validation Error",
				"Email already exists"
			)
		);
	}
	return {
		name: name,
		email: email,
		password: password,
		NIP: NIP,
		gender: gender,
		jabatan: jabatan,
		approved: approved,
		roleId: roleId

	};
};
