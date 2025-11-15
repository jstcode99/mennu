import { UserRepositoryPort } from "@modules/users/domain/ports/user.repository.port";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SignUpDto } from "../dto/sign-up.dto";
import { AuthResponseDto } from "../dto/auth-response.dto";
import { User } from "@modules/users/domain/entities/user.entity";
import { AuthMapper } from "../mappers/auth.mapper";
import { SendNotificationService } from "@modules/notifications/application/services/send-notification.service";

@Injectable()
export class SignUpService {
    constructor(
        @Inject(UserRepositoryPort)
        private readonly userRepository: UserRepositoryPort,
        private readonly jwtService: JwtService,
        private sendNotification: SendNotificationService
    ) { }

    async execute(dto: SignUpDto): Promise<AuthResponseDto> {
        const existingUser = await this.userRepository.findByEmail(dto.email);
        if (existingUser) throw new BadRequestException('Email already in use');

        const user = await User.create(dto.name, dto.email, dto.password)

        await this.userRepository.save(user);

        try {
            await this.sendNotification.execute(
                'Welcome',
                user.email,
                `Gracias por unirte a Mennu. Estamos muy contentos de tenerte con nosotros.`
            );
        } catch (error) {
            console.log(error);
            throw new BadRequestException('Throw error sending welcome email');
        }


        const token = this.jwtService.sign({ name: user.name, email: user.email });
        return AuthMapper.toAuthResponse(user, token);
    }
}
