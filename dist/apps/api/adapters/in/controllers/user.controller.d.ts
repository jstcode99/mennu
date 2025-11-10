export declare class UserController {
    private repo;
    private createUser;
    findAll(): Promise<import("../../../domain/user.entity").User[]>;
    create(body: {
        name: string;
        email: string;
    }): Promise<import("../../../domain/user.entity").User>;
}
