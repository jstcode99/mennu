import { Module, Global } from '@nestjs/common';
import { EmailNotificationService } from './infrastructure/email-notification.service';
import { SendNotificationService } from './application/services/send-notification.service';
import { TemplateService } from './infrastructure/template.service';

@Global()
@Module({
    providers: [TemplateService, EmailNotificationService, SendNotificationService],
    exports: [SendNotificationService],
})
export class NotificationsModule { }
