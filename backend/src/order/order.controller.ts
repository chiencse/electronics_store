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
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from 'src/auth/guard/jwt.guard';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { CurrentUser, TypeORMExceptionFilter } from 'src/common';
import { CreateInvoiceDto } from './dto/createInvoice.dto';

@Controller('order')
@ApiTags('Order')
@UseGuards(AuthGuard)
@ApiBearerAuth('JWT-auth')
@UseFilters(TypeORMExceptionFilter)
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @ApiProperty({ description: 'Create a new order' })
    @Post('/create')
    async create(
        @Body() createOrderDto: CreateOrderDto,
        @CurrentUser() user: any,
    ) {
        return this.orderService.create(createOrderDto, user);
    }

    @Get('/all')
    @ApiProperty({ description: 'Get all orders' })
    async findAll(@CurrentUser() user: any) {
        return this.orderService.findAll(user);
    }

    @Get(':id')
    @ApiProperty({ description: 'Get a order by id' })
    async findOne(@Param('id') id: string) {
        return this.orderService.findOne(id);
    }

    @Patch(':id')
    @ApiProperty({ description: 'Update a order by id' })
    async update(
        @Param('id') id: string,
        @Body() updateOrderDto: UpdateOrderDto,
    ) {
        return this.orderService.update(id, updateOrderDto);
    }

    @Delete(':id')
    @ApiProperty({ description: 'Delete a order by id' })
    async remove(@Param('id') id: string) {
        return this.orderService.remove(id);
    }

    @Post('/invoice')
    @ApiProperty({ description: 'Generate invoice' })
    async generateInvoice(@Body() invoiceDto: CreateInvoiceDto) {
        return this.orderService.generateInvoice(invoiceDto);
    }
}
