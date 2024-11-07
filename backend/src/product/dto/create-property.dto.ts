import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
} from 'class-validator';

export class CreatePropertyProductDto {
    @IsNumber({}, { message: 'screenSize must be a number.' })
    @IsPositive({ message: 'screenSize must be positive' })
    screenSize: number;

    @IsString({ message: 'screenType must be a string.' })
    @IsNotEmpty({ message: 'screenType cannot be empty.' })
    screenType: string;

    @IsNumber({}, { message: 'refreshRate must be a number.' })
    @IsPositive({ message: 'refreshRate must be positive' })
    refreshRate: number;

    @IsBoolean({ message: 'cellular must be a boolean.' })
    cellular: boolean;

    @IsNumber({}, { message: 'battery must be a number.' })
    @IsPositive({ message: 'battery must be positive' })
    battery: number;

    @IsString({ message: 'camera must be a string.' })
    @IsNotEmpty({ message: 'camera cannot be empty.' })
    camera: string;
}
