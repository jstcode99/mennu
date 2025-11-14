import * as bcrypt from 'bcrypt';

export class User {
    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly createdAt: Date,
    ) { }

    async validatePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }

    static async create(
        name: string,
        email: string,
        plainPassword: string,
    ): Promise<User> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
        return new User(name, email, hashedPassword, new Date());
    }
}
