import { ApiProperty } from '@nestjs/swagger';
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
    @ApiProperty({
        type: 'number',
        description: 'Screen size of the product',
    })
    screenSize: number;

    @IsString({ message: 'screenType must be a string.' })
    @IsNotEmpty({ message: 'screenType cannot be empty.' })
    @ApiProperty({
        type: 'string',
        description: 'Type of screen used in the product',
    })
    screenType: string;

    @IsNumber({}, { message: 'refreshRate must be a number.' })
    @IsPositive({ message: 'refreshRate must be positive' })
    @ApiProperty({
        type: 'number',
        description: 'Refresh rate of the screen',
    })
    refreshRate: number;

    @IsBoolean({ message: 'cellular must be a boolean.' })
    @ApiProperty({
        type: 'boolean',
        description: 'Indicates if the product supports cellular connectivity',
    })
    cellular: boolean;

    @IsNumber({}, { message: 'battery must be a number.' })
    @IsPositive({ message: 'battery must be positive' })
    @ApiProperty({
        type: 'number',
        description: 'Battery capacity of the product',
    })
    battery: number;

    @IsString({ message: 'camera must be a string.' })
    @IsNotEmpty({ message: 'camera cannot be empty.' })
    @ApiProperty({
        type: 'string',
        description: 'Camera specifications of the product',
    })
    camera: string;
}
