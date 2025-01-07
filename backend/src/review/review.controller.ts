import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
    Query,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { CurrentUser } from 'src/common';
import { User } from 'src/user/entities/user.entity';
import { AuthGuard } from 'src/auth/guard/jwt.guard';
import { RatingValidationPipe } from 'src/pipes/rating-validation.pipe';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { AuthorizeGuard } from 'src/auth/guard/authorization.guard';
import { Roles } from 'src/common/user-role.enum';

@ApiTags('Review')
@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @UseGuards(AuthGuard)
    @Post('create')
    @ApiOperation({
        summary: 'Create a new review or update review',
        description:
            'If the productId, ProductVariantId, and currentUser do not exist in the review, they will be added to the review. Otherwise, if they already exist, only the rating and comment will be updated.',
    })
    @ApiBearerAuth('JWT-auth')
    @ApiResponse({
        status: 201,
        description: 'The review has been successfully created.',
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request.',
    })
    async create(
        @Body() createReviewDto: CreateReviewDto,
        @CurrentUser() currentUser: User,
    ) {
        return await this.reviewService.create(createReviewDto, currentUser);
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Get all reviews for a product' })
    @ApiParam({
        name: 'id',
        type: String,
        description: 'Product ID to get reviews for',
    })
    @ApiQuery({
        name: 'rating',
        required: false,
        type: Number,
        description: 'Filter reviews by rating',
    })
    @ApiResponse({
        status: 200,
        description: 'Returns a list of reviews for the product.',
    })
    @ApiResponse({
        status: 404,
        description: 'Product not found or no reviews.',
    })
    @Get('getReviewByProduct/:id')
    async findAllByProduct(
        @Param('id') id: string,
        @Query('rating', RatingValidationPipe) rating?: number,
    ) {
        return await this.reviewService.findAllByProduct(id, rating);
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Get all reviews for a product variant' })
    @ApiParam({
        name: 'id',
        type: String,
        description: 'Product Variant ID to get reviews for',
    })
    @ApiQuery({
        name: 'rating',
        required: false,
        type: Number,
        description: 'Filter reviews by rating',
    })
    @ApiResponse({
        status: 200,
        description: 'Returns a list of reviews for the product variant.',
    })
    @ApiResponse({
        status: 404,
        description: 'Product variant not found or no reviews.',
    })
    @Get('getReviewByProductVariant/:id')
    async findAllByProductVariant(
        @Param('id') id: string,
        @Query('rating', RatingValidationPipe) rating?: number,
    ) {
        return await this.reviewService.findAllByProductVariant(id, rating);
    }

    @UseGuards(AuthGuard, AuthorizeGuard([Roles.ADMIN]))
    @ApiOperation({
        summary: 'Get all reviews made by a specific user (ADMIN ONLY)',
    })
    @ApiBearerAuth('JWT-auth')
    @ApiParam({
        name: 'userId',
        type: String,
        description: 'User ID to fetch reviews for',
    })
    @ApiQuery({
        name: 'rating',
        required: false,
        type: Number,
        description: 'Filter reviews by rating',
    })
    @ApiResponse({
        status: 200,
        description: 'Returns a list of reviews made by the user.',
    })
    @ApiResponse({
        status: 404,
        description: 'User not found or no reviews found.',
    })
    @Get('getReviewByUser/:userId')
    async findReviewByUser(
        @Param('userId') userId: string,
        @Query('rating', RatingValidationPipe) rating?: number,
    ) {
        return await this.reviewService.findReviewByUser(userId, rating);
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth('JWT-auth')
    @Get('getReviewById/:id')
    @ApiOperation({ summary: 'Get a review by its ID' })
    @ApiParam({
        name: 'id',
        type: String,
        description: 'Review ID to fetch',
    })
    @ApiResponse({
        status: 200,
        description: 'Returns the requested review.',
    })
    @ApiResponse({
        status: 404,
        description: 'Review not found.',
    })
    async findOne(@Param('id') id: string) {
        return await this.reviewService.findOne(id);
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth('JWT-auth')
    @Get('getReviewStatistics/:productId')
    @ApiOperation({ summary: 'Get review statistics for a product' })
    @ApiParam({
        name: 'productId',
        type: String,
        description: 'Product ID to fetch review statistics for',
    })
    @ApiResponse({
        status: 200,
        description: 'Returns the review statistics for the product.',
    })
    @ApiResponse({
        status: 404,
        description: 'Product not found or no reviews.',
    })
    async getReviewStatistics(@Param('productId') productId: string) {
        return this.reviewService.getReviewStatistics(productId);
    }

    @UseGuards(AuthGuard, AuthorizeGuard([Roles.ADMIN]))
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Delete a review by its ID (ADMIN ONLY)' })
    @ApiParam({
        name: 'id',
        type: String,
        description: 'Review ID to delete',
    })
    @ApiResponse({
        status: 200,
        description: 'Review successfully deleted.',
    })
    @ApiResponse({
        status: 404,
        description: 'Review not found.',
    })
    @Delete('deleteReview/:id')
    async remove(@Param('id') id: string) {
        return this.reviewService.remove(id);
    }
}
