import { UserRepositoryPort } from "@modules/users/domain/ports/user.repository.port";
import { BadRequestException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SignInDto } from "../dto/sign-in.dto";
import { AuthResponseDto } from "../dto/auth-response.dto";
import { AuthMapper } from "../mappers/auth.mapper";

@Injectable()
export class SignInService {
    constructor(
        @Inject(UserRepositoryPort)
        private readonly userRepository: UserRepositoryPort,
        private readonly jwtService: JwtService
    ) { }

    async execute({ email, password }: SignInDto): Promise<AuthResponseDto> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) throw new BadRequestException('Email not exists');

        const isValid = await user.validatePassword(password);
        if (!isValid) throw new UnauthorizedException('Invalid credentials');

        const token = this.jwtService.sign({ name: user.name, email: user.email });
        return AuthMapper.toAuthResponse(user, token);
    }
}
