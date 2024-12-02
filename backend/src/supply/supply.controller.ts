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
import { SupplyService } from './supply.service';
import { CreateSupplyDto } from './dto/create-supply.dto';
import { UpdateSupplyDto } from './dto/update-supply.dto';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/jwt.guard';
import { AuthorizeGuard } from 'src/auth/guard/authorization.guard';
import { Roles } from 'src/common/user-role.enum';

@ApiTags('supplier')
@Controller('supply')
export class SupplyController {
    constructor(private readonly supplyService: SupplyService) {}

    @ApiOperation({ summary: 'Create a new supplier (ADMIN only)' })
    @ApiBearerAuth('JWT-auth')
    @ApiResponse({
        status: 201,
        description: 'The category has been successfully created.',
    })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @UseGuards(AuthGuard, AuthorizeGuard([Roles.ADMIN]))
    @Post('createSupplier')
    async create(@Body() createSupplyDto: CreateSupplyDto) {
        return await this.supplyService.create(createSupplyDto);
    }

    @ApiOperation({ summary: 'find all supplier (ADMIN only)' })
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Get all suppliers' })
    @ApiResponse({ status: 200, description: 'Return all supplier.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @UseGuards(AuthGuard, AuthorizeGuard([Roles.ADMIN]))
    @Get('findAllSupplier')
    async findAll() {
        return await this.supplyService.findAll();
    }

    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Get a supplier by ID' })
    @ApiResponse({ status: 200, description: 'Return the supplier.' })
    @ApiResponse({ status: 404, description: 'supplier not found.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @UseGuards(AuthGuard, AuthorizeGuard([Roles.ADMIN]))
    @Get('findOneSupplier/:id')
    async findOne(@Param('id') id: string) {
        return this.supplyService.findOne(id);
    }

    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Update a supplier by ID' })
    @ApiResponse({
        status: 200,
        description: 'The supplier has been successfully updated.',
    })
    @ApiResponse({ status: 404, description: 'Supplier not found.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @UseGuards(AuthGuard, AuthorizeGuard([Roles.ADMIN]))
    @Patch('updateSupplier/:id')
    update(@Param('id') id: string, @Body() updateSupplyDto: UpdateSupplyDto) {
        return this.supplyService.update(id, updateSupplyDto);
    }

    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Delete a supplier by ID' })
    @ApiResponse({
        status: 200,
        description: 'The Supplier has been successfully deleted.',
    })
    @ApiResponse({ status: 404, description: 'Supplier not found.' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @UseGuards(AuthGuard, AuthorizeGuard([Roles.ADMIN]))
    @Delete('deleteSupplier/:id')
    remove(@Param('id') id: string) {
        return this.supplyService.remove(id);
    }
}
