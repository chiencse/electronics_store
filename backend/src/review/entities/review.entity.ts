import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/index';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';
import { ProductVariant } from 'src/product/entities/productVariants.entity';

@Entity()
export class Review extends BaseEntity {
    @Column()
    rating: number;

    @Column({ nullable: true })
    comment: string;

    @ManyToOne(() => User, (user) => user.reviews)
    user: User;

    @ManyToOne(() => Product, (prod) => prod.reviews, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    product: Product;

    @ManyToOne(() => ProductVariant, (prodVar) => prodVar.review)
    productVariant: ProductVariant;
}
