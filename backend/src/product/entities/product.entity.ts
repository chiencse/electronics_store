import { JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../common/index';
import { ImageProduct } from './imageProduct.entity';
import { ProductVariant } from './productVariants.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Discount } from 'src/discount/entities/discount.entity';
import { CartProduct } from 'src/cart/entities/cartProduct.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Review } from 'src/review/entities/review.entity';
import { Supplier } from 'src/supply/entities/supply.entity';

@Entity()
export class Product extends BaseEntity {
    @Column()
    name: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    baseprice: number;

    @Column({ nullable: true })
    description: string;

    @Column()
    manufacturer: string;

    @Column({ type: 'float', nullable: true })
    screenSize: number;

    @Column({ type: 'varchar', nullable: true })
    screenType: string;

    @Column({ type: 'float', nullable: true })
    refreshRate: number;


    @Column({ type: 'float', nullable: true })
    battery: number;

    @Column({ type: 'varchar', nullable: true })
    camera: string;

    @Column({ type: 'decimal', precision: 3, scale: 1, default: 0 })
    averageRating: number;

    @OneToMany(() => ImageProduct, (imageProduct) => imageProduct.product, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    imageProducts: ImageProduct[];

    @OneToMany(() => ProductVariant, (variant) => variant.product, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    variants: ProductVariant[];

    @OneToMany(() => CartProduct, (cartProduct) => cartProduct.product, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    cartProducts: CartProduct[];

    @ManyToMany(() => Discount, (discount) => discount.products)
    @JoinTable()
    discounts: Discount[];

    @ManyToOne(() => Category, (cat) => cat.products, {
        nullable: true,
        onDelete: 'SET NULL',
    })
    category: Category;

    @OneToMany(() => Review, (rev) => rev.product)
    reviews: Review[];

    @ManyToOne(() => Supplier, (sup) => sup.product, {
        nullable: true,
        onDelete: 'SET NULL',
    })
    supplier: Supplier;
}
