import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    Min,
} from 'class-validator';
import { CreateProductVariantDto } from './create-productVariant.dto';

export class UpdateProductVariantsDto extends PartialType(
    CreateProductVariantDto,
) {
    @IsOptional()
    @IsString({ message: 'id must be a string' })
    @ApiPropertyOptional({
        type: 'string',
        description: 'The ID of the variant,',
    })
    id?: string;

    @IsOptional()
    @IsNotEmpty({ message: 'ram should not be empty.' })
    @IsInt({ message: 'ram must be integer.' })
    @IsPositive({ message: 'ram must be positive' })
    @ApiPropertyOptional({
        type: 'integer',
        description: 'RAM of the variant',
    })
    ram?: number;

    @IsOptional()
    @IsNotEmpty({ message: 'rom should not be empty.' })
    @IsNumber({}, { message: 'rom must be a number.' })
    @IsPositive({ message: 'rom must be positive' })
    @ApiPropertyOptional({
        type: 'number',
        description: 'ROM of the variant',
    })
    rom?: number;

    @IsOptional()
    @IsNotEmpty({ message: 'cpu should not be empty.' })
    @IsString({ message: 'cpu must be a string.' })
    @ApiPropertyOptional({
        type: 'string',
        description: 'CPU of the variant',
    })
    cpu?: string;

    @IsOptional()
    @IsNotEmpty({ message: 'color should not be empty.' })
    @IsString({ message: 'color must be a string.' })
    @ApiPropertyOptional({
        type: 'string',
        description: 'Color of the variant',
    })
    color?: string;

    @IsOptional()
    @IsNotEmpty({ message: 'price should not be empty' })
    @IsNumber(
        { maxDecimalPlaces: 2 },
        { message: 'price must be number & max decimal precision 2' },
    )
    @IsPositive({ message: 'price should be positive number' })
    @ApiPropertyOptional({
        type: 'number',
        description: 'Price of the variant',
    })
    price?: number;

    @IsOptional()
    @IsNotEmpty({ message: 'stock should not be empty' })
    @IsNumber({}, { message: 'stock must be number' })
    @Min(0, { message: 'stock can not be negative.' })
    @ApiPropertyOptional({
        type: 'number',
        description: 'Quantity in stock for the variant',
    })
    quantity?: number;
}
