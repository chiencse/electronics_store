import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { DiscountType } from '../entities/discount.entity';

export class CreateDiscountDto {
    @IsString()
    @ApiProperty({ description: 'Discount code', example: 'NEWYEAR2025' })
    discountCode: string;

    @IsNumber()
    @ApiProperty({ description: 'Discount percentage', example: 25 })
    discountPercentage: number;

    @IsString()
    @ApiProperty({ description: 'Discount description', example: '25% off for New Year celebration' })
    description: string;

    @IsNumber()
    @ApiProperty({ description: 'Discount amount', example: 0 })
    amountDiscount: number;

    @Type(() => Date)
    @IsDate()
    @ApiProperty({
        description: 'Discount start date',
        type: 'string',
        format: 'date-time',
        example: '2025-01-01T00:00:00.000Z',
    })
    startDate: Date;

    @Type(() => Date)
    @IsDate()
    @ApiProperty({
        description: 'Discount end date',
        type: 'string',
        format: 'date-time',
        example: '2025-01-10T23:59:59.999Z',
    })
    endDate: Date;

    @IsNumber()
    @ApiProperty({
        description: 'Minimum points required for discount',
        example: 300,
    })
    points_required: number;

    @IsNumber()
    @ApiProperty({ description: 'Discount max value', example: 1000000 })
    valueMax: number;

    @IsBoolean()
    @ApiProperty({ description: 'Discount status', example: true })
    isActive: boolean;

    @IsEnum(DiscountType)
    @ApiProperty({ description: 'Discount type', enum: DiscountType, example: 'percentage' })
    discountType: DiscountType;
}
