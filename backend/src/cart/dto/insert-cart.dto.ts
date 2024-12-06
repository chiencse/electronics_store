import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class InsertCartDto {

    @IsString()
    @ApiProperty({ description: 'ID Of product', type: 'string' })
    productId: string;

    @IsString()
    @ApiProperty({ description: 'ID of variant Product', type: 'string' })
    variantId: string;
}
