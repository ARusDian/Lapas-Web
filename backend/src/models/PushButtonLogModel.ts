import { UserModel } from "./UserModel";

export interface BasePushButtonLogModel {
    id?: number;
    buttonId: number;
    userId: number;
    user?: UserModel;
    type: "KEBAKARAN" | "BENCANA" | "RUSUH";
    created_at: String;
    updated_at: String;
}

export interface PushButtonLogModel extends BasePushButtonLogModel {
    id: number;
}
