import { Injectable, NestMiddleware } from '@nestjs/common';
import { isArray } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
import { verify } from 'jsonwebtoken';
import { User } from 'src/user/entities/user.entity';

declare global {
    namespace Express {
        interface Request {
            currentUser?: User;
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService) {}
    async use(req: Request, res: Response, next: NextFunction) {
        const authHeader =
            req.headers.authorization || req.headers.Authorization;
        if (
            !authHeader ||
            isArray(authHeader) ||
            !authHeader.startsWith('Bearer ')
        ) {
            req.currentUser = null;
            next();
            return;
        } else {
            try {
                const token = authHeader.split(' ')[1];
                const { id } = <JwtPayLoad>(
                    verify(token, process.env.JWT_SECRET)
                );
                const currentUser = await this.userService.findOne(id);
                req.currentUser = currentUser;
                next();
            } catch (error) {
                req.currentUser = null;
                next();
            }
        }
    }
}
interface JwtPayLoad {
    id: string;
}
