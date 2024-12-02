import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    ValidateNested,
} from 'class-validator';
import { CreatePropertyProductDto } from './create-property.dto';
import { Type } from 'class-transformer';
import { CreateImageProductDto } from './create-image.dto';
import { CreateProductVariantDto } from './create-productVariant.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
    @IsString({ message: 'name must be a string' })
    @IsNotEmpty({ message: 'name should not be empty' })
    @ApiProperty({ type: 'string', description: 'The name of the product' })
    name: string;

    @IsNotEmpty({ message: 'price should not be empty' })
    @IsNumber(
        { maxDecimalPlaces: 2 },
        { message: 'price must be number & max decimal precision 2' },
    )
    @IsPositive({ message: 'price should be positive number' })
    @ApiProperty({
        type: 'number',
        description: 'The base price of the product',
    })
    baseprice: number;

    @IsString({ message: 'description must be a string.' })
    @IsOptional()
    @ApiPropertyOptional({
        type: 'string',
        description: 'Description of the product',
    })
    description?: string;

    @IsString({ message: 'manufacturer must be a string' })
    @ApiProperty({
        type: 'string',
        description: 'The manufacturer of the product',
    })
    manufacturer: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => CreatePropertyProductDto)
    @ApiPropertyOptional({
        type: CreatePropertyProductDto,
        description: 'Properties of the product',
    })
    properties?: CreatePropertyProductDto;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateImageProductDto)
    @ApiPropertyOptional({
        type: [CreateImageProductDto],
        description: 'List of images for the product',
    })
    imageProducts?: CreateImageProductDto[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateProductVariantDto)
    @ApiPropertyOptional({
        type: [CreateProductVariantDto],
        description: 'Variants of the product',
    })
    variants?: CreateProductVariantDto[];

    @ApiProperty({
        type: 'string',
        description: 'CategoryID of the product',
    })
    @IsNotEmpty({ message: 'category should not be empty' })
    @IsString({ message: 'category id should be a string' })
    categoryId: string;

    @ApiProperty({
        type: 'string',
        description: 'SupplierId of the product',
    })
    @IsNotEmpty({ message: 'supplier should not be empty' })
    @IsString({ message: 'supplierId should be a string' })
    supplierId: string;
}
