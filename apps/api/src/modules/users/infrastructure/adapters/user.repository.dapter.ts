import { Injectable } from "@nestjs/common";
import { UserRepositoryPort } from "../../domain/ports/user.repository.port";
import { User } from "../../domain/entities/user.entity";

@Injectable()
export class UserRepositoryAdapter implements UserRepositoryPort {
    private users: User[] = [];

    async findAll(): Promise<User[]> {
        return this.users;
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.users.find(user => user.email === email) || null;
    }

    async save(user: User): Promise<void> {
        this.users.push(user);
    }
}
