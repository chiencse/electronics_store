import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from './cart.entity';

@Entity()
export class CartProduct {
    @ApiProperty()
    @Column()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    quantity: number;

    @Column()
    productId: string;

    @Column()
    variantId:string;

    @Column()
    cartId: string;

    @ManyToOne(() => Product, (product) => product.cartProducts)
    product: Product;

    @ManyToOne(() => Cart, (cart) => cart.cartProducts)
    cart: Cart;
}
