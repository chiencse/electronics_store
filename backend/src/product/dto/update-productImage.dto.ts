import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateImageProductDto } from './create-image.dto';

export class UpdateProductImageDto extends PartialType(CreateImageProductDto) {
    @IsOptional() // Để chấp nhận `id` trong quá trình cập nhật
    @IsString({ message: 'id must be a string.' })
    @ApiProperty({ type: 'string', description: 'The ID of the image' })
    id?: string;

    @ApiProperty({
        type: 'string',
        description: 'The URL of the image for the product',
    })
    @IsString({ message: 'Image URL must be a string' })
    imageUrl: string;
}
