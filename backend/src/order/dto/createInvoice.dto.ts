import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateInvoiceDto {
    @IsNumber()
    @ApiProperty({ description: 'Total amount of the invoice' })
    total: number;

    @IsString()
    @ApiProperty({ description: 'Order id' })
    orderId: string;
}
