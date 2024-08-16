
export interface UserResponse {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    roleId: number;
    token: string;
}
