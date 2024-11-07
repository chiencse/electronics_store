import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/index';
import { Product } from './product.entity';

@Entity()
export class ImageProduct extends BaseEntity {
    @Column()
    imageUrl: string;

    @ManyToOne(() => Product, (prod) => prod.imageProducts)
    product: Product;
}
