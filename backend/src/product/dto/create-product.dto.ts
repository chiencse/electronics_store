import {
    IsArray,
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    ValidateNested,
} from 'class-validator';
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

    // @IsOptional()
    // @ValidateNested()
    // @Type(() => CreatePropertyProductDto)
    // @ApiPropertyOptional({
    //     type: CreatePropertyProductDto,
    //     description: 'Properties of the product',
    // })
    // properties?: CreatePropertyProductDto;

    @IsOptional()
    @IsNumber({}, { message: 'screenSize must be a number' })
    @ApiPropertyOptional({
        type: 'number',
        description: 'The screen size of the product',
    })
    screenSize?: number;

    @IsOptional()
    @IsString({ message: 'screenType must be a string' })
    @ApiPropertyOptional({
        type: 'string',
        description: 'The screen type of the product',
    })
    screenType?: string;

    @IsOptional()
    @IsNumber({}, { message: 'refreshRate must be a number' })
    @ApiPropertyOptional({
        type: 'number',
        description: 'The refresh rate of the product',
    })
    refreshRate?: number;

    @IsOptional()
    @IsBoolean({ message: 'cellular must be a boolean' })
    @ApiPropertyOptional({
        type: 'boolean',
        description: 'the cellular of the product',
    })
    cellular?: boolean;

    @IsOptional()
    @IsNumber({}, { message: 'battery must be a number' })
    @ApiPropertyOptional({
        type: 'number',
        description: 'The battery capacity of the product',
    })
    battery?: number;

    @IsOptional()
    @IsString({ message: 'camera must be a string' })
    @ApiPropertyOptional({
        type: 'string',
        description: 'The camera details of the product',
    })
    camera?: string;

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
