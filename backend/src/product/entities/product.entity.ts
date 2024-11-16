
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/index';
import { ImageProduct } from './imageProduct.entity';
import { ProductVariant } from './productVariants.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Discount } from 'src/discount/entities/discount.entity';
import { CartProduct } from 'src/cart/entities/cartProduct.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/index';
import { ImageProduct } from './imageProduct.entity';
import { ProductVariant } from './productVariants.entity';
import { Category } from 'src/category/entities/category.entity';

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

    @Column('json', { nullable: true })
    properties: {
        screenSize: number;
        screenType: string;
        refreshRate: number;
        cellular: boolean;
        battery: number;
        camera: string;
    };

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

    @ManyToOne(() => Category, (cat) => cat.products)
    category: Category;

}
