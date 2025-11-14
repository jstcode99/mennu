import { Injectable, Inject } from "@nestjs/common";
import { UserRepositoryPort } from "../../domain/ports/user.repository.port";
import { UserMapper } from "../mappers/user.mapper";
import { UserResponseDto } from "../dto/user-response.dto";

@Injectable()
export class ListUsersService {
    constructor(
        @Inject(UserRepositoryPort)
        private readonly userRepository: UserRepositoryPort
    ) { }

    async execute(): Promise<UserResponseDto[]> {
        const users = await this.userRepository.findAll();
        return UserMapper.toResponses(users);
    }
}