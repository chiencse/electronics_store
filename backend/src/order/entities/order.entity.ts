import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common';
import { User } from 'src/user/entities/user.entity';
import {
    Column,
    Entity,
    ManyToMany,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { Discount } from 'src/discount/entities/discount.entity';
import { OrderProduct } from './OrderProduct.entity';

@Entity()
export class Order extends BaseEntity {
    @ApiProperty({
        description: 'Order date',
        type: 'string',
        format: 'date-time',
    })
    @Column()
    orderDate: Date = new Date();

    @ApiProperty({
        description: 'Shipped date',
        type: 'string',
        format: 'date-time',
    })
    @Column({ nullable: true })
    shippedDate: Date;

    @ApiProperty({ description: 'Order status', type: 'string' })
    @Column()
    status: string;

    @ApiProperty({ description: 'Order comments', type: 'string' })
    @Column({ nullable: true })
    comments: string;

    @ApiProperty({ description: 'total price', type: 'number' })
    @Column()
    totalPrice: number;

    @ManyToOne(() => User, (customer) => customer.orders)
    customer: User;

    @ManyToMany(() => Discount, (discount) => discount.order, {
        nullable: true,
    })
    discount: Discount[];

    @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, {})
    orderProducts: OrderProduct[];

    @Column({ type: 'int', nullable: true })
    orderIdd: number;

    @Column({nullable: true})
    address: string;
    // DiscountId: number;
}
