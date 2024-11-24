import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class RatingValidationPipe implements PipeTransform {
    transform(value: any) {
        if (
            (!Number.isInteger(+value) || +value < 1 || +value > 5) &&
            !isNaN(value)
        ) {
            throw new BadRequestException(
                `Rating must be an integer between 1 and 5. Received: ${value}`,
            );
        }
        return +value; // Nếu bạn cần sử dụng rating sau này dưới dạng số
    }
}
