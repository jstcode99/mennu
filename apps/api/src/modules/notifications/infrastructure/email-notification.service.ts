import nodemailer from 'nodemailer';
import { Notification } from '../domain/notification.entity';
import { Injectable } from '@nestjs/common';
import { TemplateService } from './template.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailNotificationService {
    private transporter;

    constructor(
        private config: ConfigService,
        private templateService: TemplateService
    ) {
        console.log('process.........................', process.env.SMTP_PORT);

        this.transporter = nodemailer.createTransport({
            host: this.config.get('SMTP_HOST'),
            port: Number(this.config.get('SMTP_PORT')),
            secure: Number(this.config.get('SMTP_PORT')) === 465,
            auth: {
                user: this.config.get('SMTP_USER'),
                pass: this.config.get('SMTP_PASS'),
            },
        });
    }

    async send({ email, subject, message }: Notification): Promise<void> {
        let html = message;

        html = await this.templateService.render('base.html', {
            subject,
            email,
            message
        });

        await this.transporter.sendMail({
            from: `"Mannu Notifications" <${process.env.SMTP_USER}>`,
            to: email,
            subject: subject,
            text: message,
            html: html,
        });

        console.log(`Email enviado a ${email}: ${message}`);
    }
}
