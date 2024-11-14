import { PartialType } from '@nestjs/swagger';
import { CreateImageProductDto } from './create-image.dto';

export class UpdateProductImageDto extends PartialType(CreateImageProductDto) {}
