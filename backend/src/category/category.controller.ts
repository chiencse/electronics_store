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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/jwt.guard';
import { AuthorizeGuard } from 'src/auth/guard/authorization.guard';
import { Roles } from 'src/common/user-role.enum';

@ApiTags('category')
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post('createCategory')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard, AuthorizeGuard([Roles.ADMIN]))
    @ApiOperation({ summary: 'Create a new category (ADMIN only)' })
    @ApiResponse({
        status: 201,
        description: 'The category has been successfully created.',
    })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    async create(@Body() createCategoryDto: CreateCategoryDto) {
        return await this.categoryService.create(createCategoryDto);
    }

    @Get('getAllCategory')
    @ApiOperation({ summary: 'Get all categories' })
    @ApiResponse({ status: 200, description: 'Return all categories.' })
    async findAll() {
        return await this.categoryService.findAll();
    }

    @Get('getCategory/:id')
    @ApiOperation({ summary: 'Get a category by ID' })
    @ApiResponse({ status: 200, description: 'Return the category.' })
    @ApiResponse({ status: 404, description: 'Category not found.' })
    async findOne(@Param('id') id: string) {
        return await this.categoryService.findOne(id);
    }

    @Patch('updateCategory/:id')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard, AuthorizeGuard([Roles.ADMIN]))
    @ApiOperation({ summary: 'Update a category by ID' })
    @ApiResponse({
        status: 200,
        description: 'The category has been successfully updated.',
    })
    @ApiResponse({ status: 404, description: 'Category not found.' })
    async update(
        @Param('id') id: string,
        @Body() updateCategoryDto: UpdateCategoryDto,
    ) {
        return this.categoryService.update(id, updateCategoryDto);
    }

    @Delete('deleteCategory/:id')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard, AuthorizeGuard([Roles.ADMIN]))
    @ApiOperation({ summary: 'Delete a category by ID' })
    @ApiResponse({
        status: 200,
        description: 'The category has been successfully deleted.',
    })
    @ApiResponse({ status: 404, description: 'Category not found.' })
    async remove(@Param('id') id: string) {
        return this.categoryService.remove(id);
    }
}
