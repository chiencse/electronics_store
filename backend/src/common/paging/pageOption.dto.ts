import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

enum Order {
    ASC = 'ASC',
    DESC = 'DESC',
}

export class PageOptionDto {
    @ApiPropertyOptional({ description: 'Order ASC or DESC', enum: Order })
    @IsEnum(Order)
    @IsOptional()
    orderBy: Order;

    @ApiPropertyOptional({
        description: 'page numer',
        default: 1,
        minimum: 1,
        type: Number,
    })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(50)
    @Type(() => Number)
    @Transform(({ value }) => Number(value))
    readonly page: number = 1;

    @ApiPropertyOptional({
        description: 'number of items take per page',
        default: 10,
        minimum: 1,
        type: Number,
    })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(50)
    @Type(() => Number)
    @Transform(({ value }) => Number(value))
    readonly take: number = 10;

    get skip(): number {
        return (this.page - 1) * this.take;
    }
}
