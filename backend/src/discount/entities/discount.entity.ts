import { ApiProperty } from "@nestjs/swagger";
import { Order } from "src/order/entities/order.entity";
import {  Column, Entity, ManyToMany } from "typeorm";
import { BaseEntity } from "src/common";
import { Product } from "src/product/entities/product.entity";

export enum DiscountType {
    AMOUNT = 'amount',
    PERCENTAGE = 'percentage',
    SEASONAL = 'seasonal',
    LOYALPOINT = 'loyalpoint'
}

@Entity()
export class Discount extends BaseEntity {

    @Column({ nullable: true })
    @ApiProperty({ description: 'Discount code' })
    discountCode: string;

    @Column({ nullable: true })
    @ApiProperty({ description: 'Discount percentage' })
    discountPercentage: number;

    @Column({ nullable: true })
    @ApiProperty({ description: 'Discount description' })
    description: string;

    @Column({ nullable: true })
    @ApiProperty({ description: 'Discount amount' })
    amountDiscount: number;

    @Column({ nullable: true })
    @ApiProperty({ description: 'Discount start date', type: 'string', format: 'date-time' })
    startDate: Date;

    @Column({ nullable: true })
    @ApiProperty({ description: 'Discount end date', type: 'string', format: 'date-time' })
    endDate: Date;

    @Column({ nullable: true })
    @ApiProperty({ description: 'Minimum purchase amount required for discount' })
    points_required: number;

    @Column({ nullable: true })
    @ApiProperty({ description: 'Discount status' })
    isActive: boolean;

    @ApiProperty({ description: 'Discount type' })
    discountType: DiscountType;

    @ManyToMany(() => Order, order => order.discount, { nullable: true })
    order: Order[];

    @ManyToMany(() => Product, product => product.discounts)
    products: Product[];
    // @ManyToMany - Product 
}

