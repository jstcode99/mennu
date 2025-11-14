import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './interface/controllers/auth.controller';
import { SignUpService } from './application/services/sign-up.service';
import { UserRepositoryPort } from '../users/domain/ports/user.repository.port';
import { SignInService } from './application/services/sign-in.service';
import { UserRepositoryAdapter } from '@modules/users/infrastructure/adapters/user.repository.dapter';

@Module({
    imports: [
        JwtModule.register({
            secret: 'your_jwt_secret',
            signOptions: { expiresIn: '1h' },
        }),
    ],
    controllers: [AuthController],
    providers: [
        SignUpService,
        SignInService,
        {
            provide: UserRepositoryPort,
            useClass: UserRepositoryAdapter,
        },
    ],
})
export class AuthModule { }
