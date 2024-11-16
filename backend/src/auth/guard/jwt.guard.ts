import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthPayload } from '../../user/entities/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        // console.log('Request:', request);
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            console.log('No token found');
            throw new UnauthorizedException();
        }
        try {
            const payload = (await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
            })) as AuthPayload;
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const str = request.headers['authorization'];
        if (!str) {
            throw new UnauthorizedException();
        }
        const [type, token] = str.split(' ');
        return type === 'Bearer' ? token : undefined;
    }
}
