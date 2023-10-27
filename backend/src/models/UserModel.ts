import { PushButtonLogModel } from './PushButtonLogModel';
import { UserRecord } from "firebase-admin/auth";
import { BaseRoleModel } from ".";

export interface BaseUserModel extends UserRecord {
    id?: number;

    // Firebase Auth
    uid : string;
    email: string;
    password?: string;
    disabled: boolean;

    // User
    name: string;
    NIP: string;
    gender: "L" | "P";
    jabatan: string;
    approved : boolean;
    
    
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
