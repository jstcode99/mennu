import { User } from '@domain/user.entity';
import { UserRepository } from '@domain/user.repository.port';
export declare class CreateUserUseCase {
    private readonly repo;
    constructor(repo: UserRepository);
    execute(payload: {
        name: string;
        email: string;
    }): Promise<User>;
}
