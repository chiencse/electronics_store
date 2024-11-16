import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "src/common";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class Invoice extends BaseEntity {

    @Column()
    @ApiProperty({description: 'Total amount of the invoice'})
    total: number;

    @OneToOne(() => Order, (order) => order.invoice)
    @JoinColumn()
    order: Order;
}