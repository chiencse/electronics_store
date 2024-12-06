import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../common/index';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Roles } from 'src/common/user-role.enum';
import { Order } from 'src/order/entities/order.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Review } from 'src/review/entities/review.entity';

@Entity()
export class User extends BaseEntity {
    @Column()
    @ApiProperty({ type: 'string', description: 'The Fname of the user' })
    Fname: string;

    @Column()
    @ApiProperty({ type: 'string', description: 'The LName of the user' })
    LName: string;

    @Column()
    @ApiProperty({ type: 'string', description: 'The email of the user' })
    email: string;

    @Column()
    @ApiProperty({ type: 'string', description: 'The username of the user' })
    
    username: string;

    @Column()
    @Exclude()
    hash_password: string;

    @Column()
    @Exclude()
    salt: string;

    @Column()
    @ApiProperty({ description: 'The phone_number of the user' })
    phone_number: Number;

    @Column()
    @ApiProperty({ type: 'string', description: 'The address of the user' })
    address: string;

    @Column({ type: 'nvarchar', enum: Roles, default: [Roles.USER] })
    roles: string;

    @OneToMany(() => Order, (order) => order.customer, { nullable: true })
    orders: Order[];

    @OneToOne(() => Cart, (cart) => cart.user)
    @JoinColumn()
    cart: Cart;

    @OneToMany(() => Review, (rev) => rev.user)
    reviews: Review[];

    @Column({ type: 'nvarchar', length: 500, nullable: true })
    avatar: string | null;
}

export interface AuthPayload {
    id: string;
    email: string;
    FName: string;
    username: string;
    role: string;
}
