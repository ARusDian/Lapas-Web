export interface DeviceTokenModel {
    id: number;
    deviceToken: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date | null;
}
