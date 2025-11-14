import { Controller, Post, Body } from '@nestjs/common';
import { SignUpService } from '../../application/services/sign-up.service';
import { SignInService } from '../../application/services/sign-in.service';
import { SignUpDto } from '../../application/dto/sign-up.dto';
import { SignInDto } from '../../application/dto/sign-in.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly signUpService: SignUpService,
        private readonly signInService: SignInService
    ) { }

    @Post('sign-up')
    async signUp(@Body() dto: SignUpDto) {
        return this.signUpService.execute(dto);
    }

    @Post('sign-in')
    async signIn(@Body() dto: SignInDto) {
        return this.signInService.execute(dto);
    }
}
