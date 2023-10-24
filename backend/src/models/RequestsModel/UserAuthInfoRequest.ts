import { Request } from "express";

export interface UserAuthInfoRequest extends Request {
    userId?: number;
    roleId?: number;
}
