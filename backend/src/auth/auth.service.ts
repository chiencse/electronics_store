import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload, User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private readonly dataSource : DataSource,
        private readonly jwtService : JwtService,
    ) {}

    async googleLogin(req) {
        if (!req.user) {
            return 'No user from google';
        }
        const user = await this.dataSource.getRepository(User).findOneBy({ email: req.user.email });
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
        const payload : AuthPayload = {
            id: user.id,
            email: user.email,
        };
        return {
            message: 'User logged in successfully',
            token: this.jwtService.sign(payload),
        };
    }
}
