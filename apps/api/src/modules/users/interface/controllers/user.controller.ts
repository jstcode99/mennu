import { Controller, Get } from "@nestjs/common";
import { ListUsersService } from "@modules/users/application/services/list-user.service";

@Controller("users")
export class UserController {
    constructor(
        private readonly listUsersService: ListUsersService,
    ) { }

    @Get()
    async listUsers() {
        return this.listUsersService.execute();
    }
}
