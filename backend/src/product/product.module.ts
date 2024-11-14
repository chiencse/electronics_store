import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ImageProduct } from './entities/imageProduct.entity';
import { ProductVariant } from './entities/productVariants.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Product, ImageProduct, ProductVariant]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async () => ({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: process.env.JWT_EXPIRATION },
            }),
        }),

        AuthModule,
    ],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule {}
