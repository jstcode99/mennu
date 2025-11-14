import { User } from '@modules/users/domain/entities/user.entity';
import { AuthResponseDto } from '../dto/auth-response.dto';

export class AuthMapper {
    static toAuthResponse(user: User, token: string): AuthResponseDto {
        return {
            accessToken: token,
            name: user.name,
            email: user.email,
        };
    }
}
