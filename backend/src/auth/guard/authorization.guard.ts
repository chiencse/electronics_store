import {
    CanActivate,
    ExecutionContext,
    mixin,
    UnauthorizedException,
} from '@nestjs/common';

export const AuthorizeGuard = (allowedRoles: string[]) => {
    class RolesGuardMixin implements CanActivate {
        canActivate(context: ExecutionContext): boolean {

            const request = context.switchToHttp().getRequest();

            const result = allowedRoles.includes(request.user.role);

            if (result) return true;
            throw new UnauthorizedException('sorry, you are not authorized.');
        }
    }
    const guard = mixin(RolesGuardMixin);
    return guard;
};
