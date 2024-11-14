import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FilesAzureService } from 'src/modules/files/files.service';

import { AuthModule } from 'src/auth/auth.module';
import { RedisService } from 'src/common/redis.service';
import { MailService } from 'src/mail/mail.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),

        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async () => ({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: process.env.JWT_EXPIRATION },
            }),
        }),

        AuthModule,
    ],
    controllers: [UserController],
    providers: [UserService, FilesAzureService, RedisService, MailService],
    exports: [UserService],
})
export class UserModule {}
