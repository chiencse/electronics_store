import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
    (data, cx: ExecutionContext) => {
        const req = cx.switchToHttp().getRequest();
        return req.user;
    },
);
