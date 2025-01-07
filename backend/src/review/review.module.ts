import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { ProductModule } from 'src/product/product.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { Product } from 'src/product/entities/product.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Review, Product]),
        ProductModule,
        AuthModule,
        UserModule,
    ],
    controllers: [ReviewController],
    providers: [ReviewService],
})
export class ReviewModule {}
