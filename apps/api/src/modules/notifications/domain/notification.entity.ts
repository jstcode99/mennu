export class Notification {
    constructor(
        public readonly email: string,
        public readonly subject: string,
        public readonly message: string,
        public readonly createdAt: Date = new Date(),
    ) {
    }
    static async create(
        email: string,
        subject: string,
        message: string,
    ): Promise<Notification> {
        return new Notification(email, subject, message, new Date());
    }
}
