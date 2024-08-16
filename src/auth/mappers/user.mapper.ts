import { UserResponse } from "src/interfaces/user-response.interface";

export class UserMapper {
    static toResponse(user: Record<string, any>, token: string): UserResponse {
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            avatar: user.avatar,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            isDeleted: user.isDeleted,
            roleId: user.roleId,
            token: token
        };
    }
}