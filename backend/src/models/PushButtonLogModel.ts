import { UserModel } from "./UserModel";

export interface BasePushButtonLogModel {
    id?: number;
    userId?: number;
    user?: UserModel;
    type: "KEBAKARAN" | "BENCANA" | "RUSUH";
    created_at: String;
    updated_at: String;
}

export interface PushButtonLogModel extends BasePushButtonLogModel {
    id: number;
    userId: number;
}

export interface PushButtonLogCreationModel extends BasePushButtonLogModel {
    userId?: number;
    type: "KEBAKARAN" | "BENCANA" | "RUSUH";
}
