import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class SignInDto {
    @IsString()
    @IsOptional()
    @ApiProperty({ type: 'string', description: 'The username of the user' })
    username: string;

    @IsString()
    @ApiProperty({ type: 'string', description: 'The password of the user' })
    password: string;

    @IsEmail()
    @ApiProperty({ type: 'string', description: 'The email of the user' })
    @IsOptional()
    email: string;
}
