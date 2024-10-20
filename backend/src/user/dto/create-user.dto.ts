import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNumber,
    IsNumberString,
    IsString,
    Length,
} from 'class-validator';

export class CreateUserDto {
    @IsString()
    @ApiProperty({
        type: 'string',
        description: 'The Fname of the user',
        required: true,
    })
    Fname: string;

    @IsString()
    @ApiProperty({
        type: 'string',
        description: 'The LName of the user',
        required: true,
    })
    LName: string;

    @IsEmail()
    @ApiProperty({ type: 'string', description: 'The email of the user' })
    email: string;

    @IsString()
    @ApiProperty({
        type: 'string',
        description: 'The username of the user',
        required: true,
    })
    @Length(6, 30)
    username: string;

    @ApiProperty({
        type: 'string',
        description: 'The phone_number of the user',
    })
    @IsNumberString() // Ensures the value is a string that can be converted to a number
    phone_number?: string;

    @IsString()
    @ApiProperty({ type: 'string', description: 'The address of the user' })
    address: string;

    @IsString()
    @ApiProperty({
        type: 'string',
        description: 'The password of the user',
        required: true,
    })
    @Length(6, 30)
    password: string;
}
