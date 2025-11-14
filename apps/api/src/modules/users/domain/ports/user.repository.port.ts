import { User } from "../entities/user.entity";

export abstract class UserRepositoryPort {
    abstract findAll(): Promise<User[]>;
    abstract findByEmail(email: string): Promise<User | null>;
    abstract save(user: User): Promise<void>;
}
