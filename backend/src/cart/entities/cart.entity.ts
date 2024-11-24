import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    OneToOne,
} from 'typeorm';
import { CartProduct } from './cartProduct.entity';

@Entity()
export class Cart extends BaseEntity {
    @OneToOne(() => User, (user) => user.cart)
    user: User;

    @OneToMany(() => CartProduct, (cartProduct) => cartProduct.cart)
    cartProducts: CartProduct[];
}
