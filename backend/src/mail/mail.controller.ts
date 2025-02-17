import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) {}

    sendMail(toEmail: string, code: string) {
        return this.mailService.sendMail(toEmail, code);
    }
}
