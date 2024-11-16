import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { DiscountType } from "../entities/discount.entity";

export class CreateDiscountDto {

    @IsString()
    @ApiProperty({description: 'Discount code'})
    discountCode: string;

    @ApiProperty({description: 'Discount percentage'})
    @IsNumber()
    discountPercentage: number;

    @ApiProperty({description: 'Discount description'})
    @IsString()
    description: string;

    @ApiProperty({description: 'Discount amount'})
    @IsNumber()
    amountDiscount: number;

    @ApiProperty({description: 'Discount start date', type: 'string', format: 'date-time'})
    startDate: Date;

    @ApiProperty({description: 'Discount end date', type: 'string', format: 'date-time'})
    endDate: Date;

    @ApiProperty({description: 'Minimum purchase amount required for discount'})
    points_required: number;

    @ApiProperty({description: 'Discount status'})
    isActive: boolean;

    @ApiProperty({description: 'Discount type', enum: DiscountType})
    discountType: DiscountType;
}
