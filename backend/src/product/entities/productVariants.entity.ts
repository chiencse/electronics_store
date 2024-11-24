import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/index';
import { Product } from './product.entity';
import { Review } from 'src/review/entities/review.entity';

@Entity()
export class ProductVariant extends BaseEntity {
    @Column({ type: 'int' })
    ram: number;

    @Column({ type: 'int' })
    rom: number;

    @Column({ type: 'varchar', length: 50 })
    cpu: string;

    @Column()
    color: string;

    @Column()
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    price: number;

    @ManyToOne(() => Product, (prod) => prod.variants, {
        onDelete: 'CASCADE',
    })
    product: Product;

    @OneToMany(() => Review, (rev) => rev.productVariant)
    review: Review[];
}
