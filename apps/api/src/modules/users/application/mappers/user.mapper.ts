import { User } from "../../domain/entities/user.entity";
import { UserResponseDto } from "../dto/user-response.dto";

export class UserMapper {
    static toResponse(user: User): UserResponseDto {
        return {
            name: user.name,
            email: user.email,
            createdAt: user.createdAt.toISOString(),
        };
    }

    static toResponses(users: User[]): UserResponseDto[] {
        return users.map(UserMapper.toResponse);
    }
}
