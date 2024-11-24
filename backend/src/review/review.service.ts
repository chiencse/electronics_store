import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        private readonly productService: ProductService,
        private readonly userService: UserService,
    ) {}
    async create(createReviewDto: CreateReviewDto, currentUser: User) {
        const product = await this.productService.findOne(
            createReviewDto.productId,
        );
        if (!product) throw new NotFoundException('Product not found');
        const productVariant = await this.productService.findOneProductVariant(
            createReviewDto.productVariantId,
        );
        if (!productVariant)
            throw new NotFoundException('ProductVariant is nout found');

        //kiem tra xem productVariant co o trong product hien tai hay khong
        if (
            !product.variants ||
            !product.variants.some(
                (variant) => variant.id === productVariant.id,
            )
        ) {
            throw new NotFoundException(
                'ProductVariant does not belong to this Product',
            );
        }
        let review = await this.findOneByUserAndProductVariant(
            currentUser.id,
            createReviewDto.productId,
            createReviewDto.productVariantId,
        );
        if (!review) {
            review = this.reviewRepository.create(createReviewDto);
            review.user = currentUser;
            review.product = product;
            review.productVariant = productVariant;
        } else {
            review.comment = createReviewDto.comment;
            review.rating = createReviewDto.rating;
            review.user = currentUser;
            review.product = product;
            review.productVariant = productVariant;
        }
        const savedReview = await this.reviewRepository.save(review);

        const reviews = await this.reviewRepository.find({
            where: { product: { id: product.id } },
        });
        const totalRatings = reviews.reduce((sum, r) => sum + r.rating, 0);
        const averageRating =
            reviews.length > 0 ? totalRatings / reviews.length : 0;

        await this.productRepository
            .createQueryBuilder()
            .update(Product)
            .set({ averageRating: parseFloat(averageRating.toFixed(1)) })
            .where('id = :id', { id: product.id })
            .execute();

        return {
            user: {
                id: currentUser.id,
                username: currentUser.username,
                email: currentUser.email,
            },
            product: {
                productId: product.id,
                name: product.name,
                description: product.description,
                category: product.category,
            },
            productVariant,
            rating: savedReview.rating,
            comment: savedReview.comment,
        };
    }

    async findAllByProduct(id: string, rating?: number) {
        return await this.findReviewsByField('product', id, rating);
    }

    async findAllByProductVariant(id: string, rating?: number) {
        return await this.findReviewsByField('productVariant', id, rating);
    }

    async findReviewByUser(id: string, rating?: number) {
        const user = await this.userService.findOne(id);
        const whereCondition: any = { user: { id } };
        if (rating !== undefined && !isNaN(rating)) {
            whereCondition.rating = rating;
        }
        const reviewByUser = await this.reviewRepository.find({
            where: whereCondition,
            relations: {
                product: {
                    category: true,
                },
                productVariant: true,
            },
            select: {
                user: {
                    id: true,
                    username: true,
                    email: true,
                },
                product: {
                    id: true,
                    name: true,
                    description: true,
                },
            },
        });
        if (reviewByUser.length === 0) {
            throw new NotFoundException(
                rating !== undefined && !isNaN(rating)
                    ? `No reviews found with rating ${rating} for this user`
                    : `This user has no review`,
            );
        }
        return reviewByUser;
    }

    async findReviewsByField(field: string, id: string, rating?: number) {
        if (!id) {
            throw new BadRequestException('ID is required');
        }
        const entity =
            field === 'product'
                ? await this.productService.findOne(id)
                : await this.productService.findOneProductVariant(id);
        if (!entity) throw new NotFoundException(`${field} is not found`);

        //loc rating
        const whereCondition: any = { [field]: { id } };
        if (rating !== undefined && !isNaN(rating)) {
            whereCondition.rating = rating;
        }
        const reviews = await this.reviewRepository.find({
            where: whereCondition,
            relations: {
                user: true,
                product: { category: true },
                productVariant: field === 'product',
            },
            select: {
                user: { id: true, username: true, email: true },
                product: { id: true, name: true, description: true },
            },
        });
        if (reviews.length === 0) {
            throw new NotFoundException(
                rating !== undefined && !isNaN(rating)
                    ? `No reviews found with rating ${rating} for this ${field}`
                    : `This ${field} has no review`,
            );
        }
        return reviews;
    }

    async getReviewStatistics(productId: string) {
        const product = await this.productService.findOne(productId);
        if (!product) throw new NotFoundException('Product not found');

        //lay so luong review cho tung rating
        const reviewStatistics = await this.reviewRepository
            .createQueryBuilder('review')
            .select('review.rating', 'rating')
            .addSelect('COUNT(review.id)', 'count')
            .where('review.productId = :productId', { productId })
            .groupBy('review.rating')
            .orderBy('review.rating', 'ASC')
            .getRawMany();

        const fullStatistics = [1, 2, 3, 4, 5].map((rating) => {
            const stat = reviewStatistics.find((s) => +s.rating === rating);
            return {
                rating,
                count: stat ? +stat.count : 0,
            };
        });

        return fullStatistics;
    }

    async findOne(id: string) {
        const review = await this.reviewRepository.findOne({
            where: { id: id },
            relations: {
                user: true,
                product: {
                    category: true,
                },
                productVariant: true,
            },
            select: {
                user: {
                    id: true,
                    username: true,
                    email: true,
                },
                product: {
                    id: true,
                    name: true,
                    description: true,
                },
            },
        });
        if (!review) throw new NotFoundException('Review is not found');
        return review;
    }

    async remove(id: string) {
        const review = await this.findOne(id);
        return await this.reviewRepository.remove(review);
    }

    async findOneByUserAndProductVariant(
        userId: string,
        productId: string,
        productVariantId: string,
    ) {
        return await this.reviewRepository.findOne({
            where: {
                user: {
                    id: userId,
                },
                product: {
                    id: productId,
                },
                productVariant: {
                    id: productVariantId,
                },
            },
        });
    }
}
