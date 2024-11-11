import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Exception } from 'src/common';
import { RedisService } from 'src/modules/redis/redis.service';
import { AuthPayload, User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private readonly dataSource: DataSource,
        private readonly jwtService: JwtService,
        private redisService : RedisService,
    ) {}

    async googleLogin(req) {
        if (!req.user) {
            return 'No user from google';
        }
        const user = await this.dataSource
            .getRepository(User)
            .findOneBy({ email: req.user.email });
        if (!user) {
            const newUser = this.dataSource.getRepository(User).create({
                Fname: req.user.FName,
                LName: req.user.LName,
                email: req.user.email,
                salt: '',
                hash_password: '',
                username: '',
                phone_number: 0,
                address: '',
            });
            await this.dataSource.getRepository(User).save(newUser);
            return {
                message: 'User created successfully',
                token: this.jwtService.sign({
                    id: newUser.id,
                    email: newUser.email,
                }),
            };
        }
        const payload: AuthPayload = {
            id: user.id,
            email: user.email,
        };
        return {
            message: 'User logged in successfully',
            token: this.jwtService.sign(payload),
        };
    }

    async verifyCode(code: string, email: string) {
        const mCode = await this.redisService.get(email);
        if(!mCode) {
            return new Exception( 400, 'Code expired');
        }
        if(mCode !== code) {
            return new Exception( 400, 'Code invalid');
        }
        await this.redisService.del(email);
        const user = await this.dataSource.getRepository(User).findOneBy({ email });
        return {
            message: 'Code verified successfully',
            token: this.jwtService.sign({ id: user.id, email: user.email }),
        };
    }
}
