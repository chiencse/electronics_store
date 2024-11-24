import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { DiscountService } from './discount.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { AuthGuard } from 'src/auth/guard/jwt.guard';
import { AuthorizeGuard } from 'src/auth/guard/authorization.guard';
import { Roles } from 'src/common/user-role.enum';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';

@Controller('discount')
@ApiTags('Discount')
@UseGuards(AuthGuard, AuthorizeGuard([Roles.ADMIN]))
@ApiBearerAuth('JWT-auth')
export class DiscountController {
    constructor(private readonly discountService: DiscountService) {}

    @ApiProperty({
        description: 'Create a new discount',
        type: CreateDiscountDto,
    })
    @Post()
    @UseGuards(AuthGuard, AuthorizeGuard([Roles.ADMIN]))
    create(@Body() createDiscountDto: CreateDiscountDto) {
        return this.discountService.create(createDiscountDto);
    }

    @Get()
    findAll() {
        return this.discountService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.discountService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateDiscountDto: UpdateDiscountDto,
    ) {
        return this.discountService.update(id, updateDiscountDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.discountService.remove(id);
    }
}
