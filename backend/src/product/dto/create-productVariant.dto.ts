import {
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
    Min,
} from 'class-validator';

export class CreateProductVariantDto {
    @IsNotEmpty({ message: 'ram should not be empty.' })
    @IsInt({ message: 'ram must be integer.' })
    @IsPositive({ message: 'ram must be positive' })
    ram: number;

    @IsNotEmpty({ message: 'rom should not be empty.' })
    @IsNumber({}, { message: 'rom must be a number.' })
    @IsPositive({ message: 'rom must be positive' })
    rom: number;

    @IsNotEmpty({ message: 'cpu should not be empty.' })
    @IsString({ message: 'cpu must be a string.' })
    cpu: string;

    @IsNotEmpty({ message: 'color should not be empty.' })
    @IsString({ message: 'color must be a string.' })
    color: string;

    @IsNotEmpty({ message: 'price should not be empty' })
    @IsNumber(
        { maxDecimalPlaces: 2 },
        { message: 'price must be number & max decimal precision 2' },
    )
    @IsPositive({ message: 'price should be positive number' })
    price: number;

    @IsNotEmpty({ message: 'stock should not be empty' })
    @IsNumber({}, { message: 'price must be number' })
    @Min(0, { message: 'Price can not be negative.' })
    quantity: number;
}
