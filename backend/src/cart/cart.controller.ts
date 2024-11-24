import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    UseFilters,
} from '@nestjs/common';
import { CartService } from './cart.service';

import {
    ApiBearerAuth,
    ApiOperation,
    ApiProperty,
    ApiTags,
} from '@nestjs/swagger';
import { CurrentUser, TypeORMExceptionFilter } from 'src/common';
import { AuthPayload } from 'src/user/entities/user.entity';
import { AuthGuard } from 'src/user/guard/jwt.guard';

@Controller('cart')
@ApiTags('Cart')
@UseFilters(TypeORMExceptionFilter)
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Retrieve all item in cart' })
    @Get('all')
    async findAll(@CurrentUser() user: AuthPayload) {
        return this.cartService.findAll(user);
    }

    @ApiOperation({ summary: 'insert item to cart' })
    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard)
    @Post(':id')
    async insertCart(
        @Param('id') id: string,
        @CurrentUser() user: AuthPayload,
    ) {
        return this.cartService.insert(id, user);
    }

    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'remove item in cart by ID' })
    @Delete(':id')
    async remove(@Param('id') id: string, @CurrentUser() user: AuthPayload) {
        return this.cartService.remove(id, user);
    }
}
