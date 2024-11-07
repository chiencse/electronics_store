import { IsString } from 'class-validator';

export class CreateImageProductDto {
    @IsString({ message: 'Image URL must be a string' })
    imageUrl: string;
}
