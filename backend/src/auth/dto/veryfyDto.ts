import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class verifyDto {
    @ApiProperty({ description: 'Code to verify' })
    @IsString()
    code: string;
    @ApiProperty({ description: 'Email to verify' })
    @IsString()
    email: string;
}
