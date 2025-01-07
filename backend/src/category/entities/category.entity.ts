import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/index';
import { Product } from 'src/product/entities/product.entity';

@Entity()
export class Category extends BaseEntity {
    @Column()
    title: string;

    @Column()
    description: string;

    @OneToMany(() => Product, (prod) => prod.category)
    products: Product[];
}
