"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserUseCase = void 0;
const user_entity_1 = require("../domain/user.entity");
class CreateUserUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(payload) {
        const user = new user_entity_1.User(Date.now().toString(), payload.name, payload.email);
        return this.repo.create(user);
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
