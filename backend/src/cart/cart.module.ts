import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartProduct } from './entities/cartProduct.entity';

@Module({

  imports: [ProductModule, UserModule, TypeOrmModule.forFeature([Cart, CartProduct])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
