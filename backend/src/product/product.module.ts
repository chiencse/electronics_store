import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ImageProduct } from './entities/imageProduct.entity';
import { ProductVariant } from './entities/productVariants.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Product, ImageProduct, ProductVariant]),
    ],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule {}
