import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
    @ApiProperty({
        example: 'Electronics',
        description: 'The name of the category',
        type: String,
    })
    @IsString({ message: 'Title should be a string' })
    @IsNotEmpty({ message: 'Title must not be empty' })
    title: string;

    @ApiProperty({
        example: 'Category for electronic devices',
        description: 'Detailed description of the category',
        type: String,
    })
    @IsString({ message: 'Description should be a string' })
    @IsNotEmpty({ message: 'Description must not be empty' })
    description: string;
}
