import { Module } from "@nestjs/common";
import { UserRepositoryPort } from "./domain/ports/user.repository.port";
import { UserController } from "./interface/controllers/user.controller";
import { ListUsersService } from "./application/services/list-user.service";
import { UserRepositoryAdapter } from "./infrastructure/adapters/user.repository.dapter";

@Module({
    controllers: [UserController],
    providers: [
        ListUsersService,
        {
            provide: UserRepositoryPort,
            useClass: UserRepositoryAdapter,
        },
    ],
})
export class UsersModule { }
