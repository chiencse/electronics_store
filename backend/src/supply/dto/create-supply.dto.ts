import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches } from 'class-validator';

export class CreateSupplyDto {
    @ApiProperty({
        description: 'Name of the supply',
        type: String,
    })
    @IsString({ message: 'Name must be a string' })
    name: string;

    @ApiProperty({
        description: 'Address of the supply',
        type: String,
    })
    @IsString({ message: 'Address must be a string' })
    address: string;

    @ApiProperty({
        description: 'Email address of the supply',
        type: String,
        example: 'example@supply.com',
    })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email: string;

    @ApiProperty({
        description: 'Phone number of the supply (10-11 digits)',
        type: String,
        example: '01234567890',
    })
    @Matches(/^\d{10,11}$/, {
        message: 'Phone number must be 10-11 digits and contain only numbers',
    })
    phone: string;
}
