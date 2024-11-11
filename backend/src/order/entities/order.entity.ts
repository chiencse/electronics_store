import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "src/common";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Order extends BaseEntity {

    @ApiProperty({description: 'Order date', type: 'string', format: 'date-time' })
    @Column()
    orderDate: Date = new Date();

    @ApiProperty({description: 'Required date', type: 'string', format: 'date-time' })
    @Column()
    requiredDate: Date;
    
    @ApiProperty({description: 'Shipped date', type: 'string', format: 'date-time' })
    @Column()
    shippedDate: Date;
    
    @ApiProperty({description: 'Order status', type: 'string' })
    @Column()
    status: string;
    
    @ApiProperty({description: 'Order comments', type: 'string' })
    @Column()
    comments: string;
    
    @ManyToOne(() => User, (customer) => customer.orders)
    customer: User;


    // @ApiProperty({description: 'Customer number', type: 'number' })
    // ProductId: number;
    // InvoiceId: number;
    // DiscountId: number;

}


