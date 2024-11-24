import { PartialType } from '@nestjs/swagger';
import { InsertCartDto } from './insert-cart.dto';

export class UpdateCartDto extends PartialType(InsertCartDto) {}
