import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common';
import { User } from 'src/user/entities/user.entity';
import {
    Column,
    Entity,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
} from 'typeorm';
import { Invoice } from './invoice.entity';
import { Discount } from 'src/discount/entities/discount.entity';

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
        description: 'Required date',
        type: 'string',
        format: 'date-time',
    })
    @Column()
    requiredDate: Date;

    @ApiProperty({
        description: 'Shipped date',
        type: 'string',
        format: 'date-time',
    })
    @Column()
    shippedDate: Date;

    @ApiProperty({ description: 'Order status', type: 'string' })
    @Column()
    status: string;

    @ApiProperty({ description: 'Order comments', type: 'string' })
    @Column()
    comments: string;

    @ManyToOne(() => User, (customer) => customer.orders)
    customer: User;

    @OneToOne(() => Invoice, (invoice) => invoice.order)
    invoice: Invoice;

    @ManyToMany(() => Discount, (discount) => discount.order, {
        nullable: true,
    })
    discount: Discount[];
    // @ApiProperty({description: 'Customer number', type: 'number' })
    // ProductId: number;

    // DiscountId: number;
}
