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

export class CreateProductDto {
    @IsString({ message: 'name must be a string' })
    @IsNotEmpty({ message: 'name should not be empty' })
    name: string;

    @IsNotEmpty({ message: 'price should not be empty' })
    @IsNumber(
        { maxDecimalPlaces: 2 },
        { message: 'price must be number & max decimal precision 2' },
    )
    @IsPositive({ message: 'price should be positive number' })
    baseprice: number;

    @IsString({ message: 'description must be a string.' })
    @IsOptional()
    description?: string;

    @IsString({ message: 'manufacturer must be a string' })
    manufacturer: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => CreatePropertyProductDto)
    properties?: CreatePropertyProductDto;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateImageProductDto)
    imageProducts?: CreateImageProductDto[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateProductVariantDto)
    variants?: CreateProductVariantDto[];
}
