import { PartialType } from '@nestjs/swagger';
import { CreateProductVariantDto } from './create-productVariant.dto';

export class UpdateProductVariantsDto extends PartialType(
    CreateProductVariantDto,
) {}
