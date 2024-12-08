import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';
export class CreateOrderDto {

    @IsArray()
    @ApiProperty({ description: 'List of product IDs', type: 'array', items: { type: 'string' } })
    listProduct: { productId: string, variantId: string, quantity: number }[];

    @IsString()
    @ApiProperty({
        description: 'Required date',
        type: 'string',
        format: 'date-time',
    })
    requiredDate: Date;
    @IsString()
    @ApiProperty({
        description: 'Shipped date',
        type: 'string',
        format: 'date-time',
    })
    shippedDate: Date;
    @IsString()
    @ApiProperty({ description: 'Order status', type: 'string' })
    status: string;

    @IsString()
    @ApiProperty({ description: 'Order comments', type: 'string' })
    comments: string;

    @IsNumber()
    @ApiProperty({ description: 'total price', type: 'number' })
    totalPrice: number;

    @IsString()
    @ApiProperty({ description: 'Address of Customer', type: 'string' })
    address: string;

    @IsNumber()
    @ApiProperty({ description: 'Order Id', type: 'number' })
    orderIdd: number;
}
