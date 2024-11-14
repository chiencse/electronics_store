import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
export class CreateOrderDto {
    @IsString()
    @ApiProperty({description: 'Required date', type: 'string', format: 'date-time' })
    requiredDate: Date;
    @IsString()
    @ApiProperty({description: 'Shipped date', type: 'string', format: 'date-time' })
    
    shippedDate: Date;
    @IsString()
    @ApiProperty({description: 'Order status', type: 'string' })
    
    status: string;
    
    @IsString()
    @ApiProperty({description: 'Order comments', type: 'string' })
    
    comments: string;
}