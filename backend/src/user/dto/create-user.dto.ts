import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsEnum,
    IsNumberString,
    IsString,
    Length,
} from 'class-validator';
import { Roles } from 'src/common/user-role.enum';

export class CreateUserDto {
    @IsString()
    @ApiProperty({
        type: 'string',
        description: 'The Fname of the user',
        default: 'Your First Name',
    })
    Fname: string;

    @IsString()
    @ApiProperty({
        type: 'string',
        description: 'The LName of the user',
        default: 'Your Last Name',
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

    @Optional()
    @IsString()
    @ApiProperty({
        type: 'string',
        description: 'Image User',
        default: 'default.jpg',
    })
    image: string;

    @IsEnum(Roles, { each: true })
    @ApiProperty({
        enum: Roles,
        type: 'string',
        description: 'The roles of the user',
        example: Roles.USER,
    })
    roles: string;
}
