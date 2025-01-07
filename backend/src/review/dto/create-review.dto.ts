import { IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
    @ApiProperty({
        description: 'The unique identifier of the product being reviewed.',
        type: String,
        example: '12345',
    })
    @IsNotEmpty({ message: 'ProductId should not be empty' })
    @IsString({ message: 'ProductId should be a string' })
    productId: string;

    @ApiProperty({
        description:
            'The unique identifier of the product variant being reviewed.',
        type: String,
        example: '67890',
    })
    @IsNotEmpty({ message: 'ProductVariantId should not be empty' })
    @IsString({ message: 'ProductVariantId should be a string' })
    productVariantId: string;

    @ApiProperty({
        description:
            'The rating given by the user for the product, must be between 1 and 5.',
        type: Number,
        example: 4,
        minimum: 1,
        maximum: 5,
    })
    @IsNotEmpty({ message: 'Ratings should not be empty' })
    @Min(1, { message: 'Ratings should be between 1 and 5' })
    @Max(5, { message: 'Ratings should be between 1 and 5' })
    rating: number;

    @ApiProperty({
        description:
            'An optional comment provided by the user about the product.',
        type: String,
        example: 'Great product, really liked it!',
        required: false,
    })
    @IsOptional()
    @IsString({ message: 'Comment should be a string' })
    comment: string;
}
