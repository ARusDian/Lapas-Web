import { PushButtonLogModel } from './PushButtonLogModel';
import { UserRecord } from "firebase-admin/auth";
import { BaseRoleModel } from ".";

type CustomUserRecord = Omit<UserRecord, "metadata" | "providerData" | "toJSON" | "emailVerified" | "uid">;

export interface BaseUserModel extends CustomUserRecord {
    id?: number;

    // Firebase Auth
    uid : string | null;
    email: string;
    password?: string;
    disabled: boolean;

    // User
    name: string;
    NIP: string | null;
    gender: "L" | "P";
    jabatan: string;
    approved: boolean;
    
    deviceToken? : string | null;
    
    role?: BaseRoleModel;
    roleId?: number;

    pushButtonLog?: PushButtonLogModel[];
    
    created_at?: String;
    updated_at?: String;

}

export interface UserModel extends BaseUserModel {
    id: number;
}

export interface UserRegistrationModel extends BaseUserModel {
    confirmPassword: string;
}
