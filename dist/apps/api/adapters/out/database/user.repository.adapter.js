"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryUserRepository = void 0;
const DB = [];
class InMemoryUserRepository {
    async create(user) {
        DB.push(user);
        return user;
    }
    async findAll() {
        return DB;
    }
}
exports.InMemoryUserRepository = InMemoryUserRepository;
