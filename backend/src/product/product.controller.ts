import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PageOptionDto } from 'src/common/paging/pageOption.dto';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post('create')
    async create(@Body() createProductDto: CreateProductDto) {
        return await this.productService.create(createProductDto);
    }

    @Get('getAllProduct')
    async findAll(
        @Query() pageOption : PageOptionDto
    ) {
        return await this.productService.findAll(pageOption);
    }

    @Get('getDetailProduct/:id')
    async findOne(@Param('id') id: string) {
        return await this.productService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto,
    ) {
        return this.productService.update(+id, updateProductDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productService.remove(+id);
    }
}
