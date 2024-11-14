import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/index';
import { ImageProduct } from './imageProduct.entity';
import { ProductVariant } from './productVariants.entity';

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
}
