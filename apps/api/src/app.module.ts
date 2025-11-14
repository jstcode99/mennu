import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '@modules/users/users.module';
import { AuthModule } from '@modules/auth/auth.module';


@Module({
  imports: [
    // JwtModule global config (puedes mover a módulo propio si prefieres)
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'dev_secret_change_me',
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
