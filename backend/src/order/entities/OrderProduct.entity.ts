import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "src/product/entities/product.entity";

@Entity()
export class OrderProduct {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    quantity: number;

    @Column()
    productId: number;

    @Column()
    variantId:string;

    @ManyToOne(() => Order, (order) => order.orderProducts)
    order: Order;

    @ManyToOne(()=> Product, (product) => product.orderProducts)
    product: Product;
}