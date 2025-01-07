import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/index';
import { Product } from 'src/product/entities/product.entity';

@Entity()
export class Supplier extends BaseEntity {
    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @OneToMany(() => Product, (pro) => pro.supplier)
    product: Product[];
}
