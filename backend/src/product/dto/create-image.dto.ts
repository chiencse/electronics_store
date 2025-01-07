import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateImageProductDto {
    @ApiPropertyOptional({
        type: 'string',
        description: 'The ID of the image',
        example: 'image-id', // Optional: chỉ dùng nếu muốn hiển thị ví dụ
    })
    @IsOptional() // Để chấp nhận `id` trong quá trình cập nhật
    @IsString({ message: 'id must be a string.' })
    id?: string;

    @ApiProperty({
        type: 'string',
        description: 'The URL of the image for the product',
    })
    @IsString({ message: 'Image URL must be a string' })
    imageUrl: string;
}
