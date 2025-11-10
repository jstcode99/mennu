import { User } from '@domain/user.entity';
import { UserRepository } from '@domain/user.repository.port';
export declare class InMemoryUserRepository implements UserRepository {
    create(user: User): Promise<User>;
    findAll(): Promise<User[]>;
}
