import { error } from './../../middleware/Logger';
import { FirebaseError } from "firebase-admin";

export class ErrorResponse implements FirebaseAuthError {


	code: number;
	status: string;
	error: ErrorDetails;
	meta: {
		timestamp: string;
	};
	errorInfo?: {
		code: string;
		message: string;
	};
	constructor(code: number, status: string, error: ErrorDetails) {
		this.code = code;
		this.status = status;
		this.error = error;
		this.meta = {
			timestamp: Date.now().toLocaleString(),
		};
	}

}

export class ErrorDetails extends Error {
	name: string;
	message: string;
	details: string;
	constructor(name: string, message: string, details: string) {
		super(message);
		this.name = name;
		this.message = message;
		this.details = details;
		Error.captureStackTrace(this, this.constructor);
	}
}

export interface FirebaseAuthError {

	errorInfo?: {
		code: string;
		message: string;
	};

	// code: string;
	// message: string;
	// name: string;
	// stack?: string | undefined;
	// constructor(code: string, message: string) {
	// 	this.code = code;
	// 	this.message = message;
	// 	this.name = "FirebaseAuthError";
	// 	Error.captureStackTrace(this, this.constructor);
	// }
	// toJSON(): object {
	// 	return Object.getOwnPropertyNames(this).reduce((obj, key) => {
	// 		// @ts-ignore
	// 		obj[key] = this[key];
	// 		return obj;
	// 	}, {});
	// }
}
