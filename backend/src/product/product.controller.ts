import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PageOptionDto } from 'src/common/paging/pageOption.dto';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/jwt.guard';
import { AuthorizeGuard } from 'src/auth/guard/authorization.guard';
import { Roles } from 'src/common/user-role.enum';

@Controller('product')
@ApiTags('Product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post('createProduct')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard, AuthorizeGuard([Roles.ADMIN]))
    @ApiOperation({ summary: 'Create a new product (ADMIN ONLY)' })
    @ApiResponse({
        status: 201,
        description: 'The product has been successfully created',
    })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async create(@Body() createProductDto: CreateProductDto) {
        return await this.productService.create(createProductDto);
    }

    @Get('getAllProduct')
    @ApiOperation({ summary: 'Retrieve all products with pagination' })
    @ApiResponse({
        status: 200,
        description: 'Successfully retrieved products.',
    })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    async findAll(@Query() pageOption: PageOptionDto) {
        return await this.productService.findAll(pageOption);
    }

    @Get('getDetailProduct/:id')
    @ApiOperation({ summary: 'Retrieve product details by ID' })
    @ApiResponse({
        status: 200,
        description: 'Successfully retrieved product details.',
    })
    @ApiResponse({ status: 404, description: 'Product not found.' })
    async findOne(@Param('id') id: string) {
        return await this.productService.findOne(id);
    }

    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard, AuthorizeGuard([Roles.ADMIN]))
    @Patch('updateProduct/:id')
    @ApiOperation({
        summary: 'Update product information by ID (ADMIN ONLY)',
        description:
            'Updates product information, images, and variants. To modify an existing image, include its ID and new URL in the request body. To add a new image, only the URL is required. For variants, providing an ID will update the specified variant; omitting the ID will add a new variant to the product.',
    })
    @ApiResponse({
        status: 200,
        description: 'The product has been successfully updated.',
    })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 404, description: 'Product not found.' })
    async update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto,
    ) {
        return await this.productService.update(id, updateProductDto);
    }

    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard, AuthorizeGuard([Roles.ADMIN]))
    @Delete('deleteProduct/:id')
    @ApiOperation({ summary: 'Delete a product by ID (ADMIN ONLY)' })
    @ApiResponse({
        status: 200,
        description: 'The product has been successfully deleted.',
    })
    @ApiResponse({ status: 404, description: 'Product not found.' })
    async removeProduct(@Param('id') id: string) {
        return await this.productService.removeProduct(id);
    }

    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard, AuthorizeGuard([Roles.ADMIN]))
    @Delete('deleteProductImage/:id')
    @ApiOperation({
        summary: 'Delete an image associated in a product by ID (ADMIN ONLY)',
    })
    @ApiResponse({
        status: 200,
        description: 'The product image has been successfully deleted.',
    })
    @ApiResponse({ status: 404, description: 'Product image not found.' })
    async removeImageProduct(@Param('id') id: string) {
        return await this.productService.removeImageProduct(id);
    }

    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard, AuthorizeGuard([Roles.ADMIN]))
    @Delete('deleteProductVariant/:id')
    @ApiOperation({
        summary: 'Delete a variant associated in a product by ID (ADMIN ONLY)',
    })
    @ApiResponse({
        status: 200,
        description: 'The product variant has been successfully deleted.',
    })
    @ApiResponse({ status: 404, description: 'Product variant not found.' })
    async removeVariantProduct(@Param('id') id: string) {
        return await this.productService.removeVariantProduct(id);
    }
}
