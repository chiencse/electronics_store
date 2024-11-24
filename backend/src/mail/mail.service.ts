import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    sendMail(toEmail: string, code: string) {
        this.mailerService
            .sendMail({
                to: toEmail,
                subject: 'Code for Forgot Your Account',
                text: 'Here is your code to reset your password',
                html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.5;">
                    <h2>Code for Forgot Your Account</h2>
                    <p>Here is your code to reset your password:</p>
                    <p style="font-size: 24px; font-weight: bold;">${code}</p>
                    <p>If you did not request this code, please ignore this email.</p>
                </div>
            `,
            })
            .then(() => {
                console.log('Mail sent successfully to ' + toEmail);
            });
    }
}
