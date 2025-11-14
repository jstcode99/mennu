import { UserRepositoryPort } from "@modules/users/domain/ports/user.repository.port";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SignUpDto } from "../dto/sign-up.dto";
import { AuthResponseDto } from "../dto/auth-response.dto";
import { User } from "@modules/users/domain/entities/user.entity";
import { AuthMapper } from "../mappers/auth.mapper";

@Injectable()
export class SignUpService {
    constructor(
        @Inject(UserRepositoryPort)
        private readonly userRepository: UserRepositoryPort,
        private readonly jwtService: JwtService
    ) { }

    async execute(dto: SignUpDto): Promise<AuthResponseDto> {
        const existingUser = await this.userRepository.findByEmail(dto.email);
        if (existingUser) throw new BadRequestException('Email already in use');

        const user = await User.create(dto.name, dto.email, dto.password)

        await this.userRepository.save(user);

        const token = this.jwtService.sign({ name: user.name, email: user.email });
        return AuthMapper.toAuthResponse(user, token);
    }
}
