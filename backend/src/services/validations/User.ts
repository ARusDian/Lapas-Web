import { BaseUserModel, ErrorDetails, ErrorResponse } from "../../models";
import { getUserByEmailService } from "../UserService";

export const UserInputValidation = async (newUser: BaseUserModel, errorName: string, isUpdate: boolean = false) => {
	const { name, email, password, roleId, NIP, gender, jabatan, approved } = newUser;
	if (!name || !email || NIP === undefined || !gender || jabatan === undefined ) {
		let empty = "";
		if (!name) empty += "name, ";
		if (!email) empty += "email, ";
		if (!NIP) empty += "NIP, ";
		if (!gender) empty += "gender, ";
		if (!jabatan) empty += "jabatan, ";
		throw new ErrorResponse(
			400,
			"Bad Request",
			new ErrorDetails(
				errorName,
				"Validation Error",
				"All fields are required :" + empty.slice(0, -2)
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

	if (!isUpdate) {
		if (!password) {
			throw new ErrorResponse(
				400,
				"Bad Request",
				new ErrorDetails(
					errorName,
					"Validation Error",
					"Password is required"
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
	}

	if (!isUpdate) {
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
	}
	return {
		name: name,
		email: email,
		password: isUpdate ? undefined : password,
		NIP: NIP,
		gender: gender,
		jabatan: jabatan,
		approved: approved,
		roleId: roleId

	};
};
