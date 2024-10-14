import { HttpException, HttpStatus } from '@nestjs/common';

export type ExceptionData = {
    message: string;
    data?: any;
    statusCode: number;
};

export class Exception extends HttpException {
    private readonly exceptionData: ExceptionData;

    constructor(statusCode: HttpStatus, message: string, data?: any) {
        super(message, statusCode);
        this.exceptionData = {
            statusCode,
            message,
            data,
        };
    }
}

export class ExceptionEntityNotFound extends Exception {
    constructor(message: string, data?: any) {
        super(HttpStatus.NOT_FOUND, message, data);
    }
}

export class ExceptionBadRequest extends Exception {
    constructor(message: string, data?: any) {
        super(HttpStatus.BAD_REQUEST, message, data);
    }
}
