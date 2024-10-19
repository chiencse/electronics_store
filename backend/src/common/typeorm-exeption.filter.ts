import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class TypeORMExceptionFilter implements ExceptionFilter {
    catch(exception: QueryFailedError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const message = exception.message;

        if (
            message.includes('duplicate key value violates unique constraint')
        ) {
            response.status(409).json({
                statusCode: 409,
                message: 'Duplicate key value violates unique constraint',
                error: 'Conflict',
            });
        } else {
            response.status(500).json({
                statusCode: 500,
                message: 'Internal server error',
                error: 'Internal Server Error',
            });
        }
    }
}
