import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
@Global()
@Module({

  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        }
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      
    }
    )
  ],

  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
