import { Injectable } from '@nestjs/common';
import { Notification } from '../../domain/notification.entity';
import { EmailNotificationService } from '../../infrastructure/email-notification.service';

@Injectable()
export class SendNotificationService {
    constructor(private emailService: EmailNotificationService) { }

    async execute(subject: string, email: string, message: string): Promise<Notification> {
        const notification = await Notification.create(email, subject, message);

        await this.emailService.send(notification);
        return notification;
    }
}
