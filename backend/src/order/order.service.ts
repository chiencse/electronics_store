import {
    Injectable,
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ExceptionEntityNotFound } from 'src/common';
import { Product } from 'src/product/entities/product.entity';
import { OrderProduct } from './entities/OrderProduct.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { CartProduct } from 'src/cart/entities/cartProduct.entity';
import { Discount } from 'src/discount/entities/discount.entity';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private orderRepo: Repository<Order>,
        @InjectRepository(OrderProduct)
        private readonly orderProductRepo: Repository<OrderProduct>,
        private readonly dataSource: DataSource,
    ) {}

    async create(createOrderDto: CreateOrderDto, user: any) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
    
        try {
            // Find customer
            const customer = await queryRunner.manager.findOne(User, {
                where: { id: user.id },
            });
            if (!customer) {
                throw new NotFoundException(`User with ID ${user.id} not found`);
            }
    
            // Create the order
            const order = queryRunner.manager.create(Order, {
                ...createOrderDto,
                customer,
            });
    
            // Insert the order instead of save (to avoid potential update)
            await queryRunner.manager.insert(Order, order);
    
            // Handle products with better error handling
            const orderProducts = await Promise.all(
                createOrderDto.listProduct.map(async (item) => {
                    try {
                        const product = await queryRunner.manager.findOne(Product, {
                            where: { id: item.productId },
                        });
    
                        if (!product) {
                            console.error(`Product with ID ${item.productId} not found`);
                            throw new NotFoundException(
                                `Product with ID ${item.productId} not found`
                            );
                        }
    
                        const orderProduct = queryRunner.manager.create(OrderProduct, {
                            quantity: item.quantity,
                            product,
                            variantId: item.variantId,
                            order,
                        });
                        
                        //Delete Cart Item
                        const cart = await queryRunner.manager.findOne(Cart, {
                            where: { user: { id: user.id } },
                        });
                        if (!cart) {
                            throw new NotFoundException(`Cart with User ID ${user.id} not found`);
                        }
                        const cartProduct = await queryRunner.manager.findOne(CartProduct, {
                            where : {
                                productId: item.productId,
                                variantId: item.variantId,
                                cartId: cart.id
                            }
                        });

                        console.log("Cart", cartProduct);
                        if(cartProduct){
                            if(item.quantity >= cartProduct.quantity){
                            await queryRunner.manager.delete(CartProduct, cartProduct);
                            }
                            else{
                                cartProduct.quantity -= item.quantity;
                                await queryRunner.manager.save(CartProduct, cartProduct);
                            }
                        }
                        // Insert orderProduct into the database instead of save
                        await queryRunner.manager.insert(OrderProduct, orderProduct);
                        return orderProduct; // Return orderProduct to attach later
                    } catch (error) {
                        console.error(`Error processing product with ID ${item.productId}:`, error);
                        throw error; // Re-throw to trigger rollback
                    }
                })
            );
            
            const discount = await queryRunner.manager.findOne(Discount, {
                where: { id: createOrderDto.discountId },
            });

            if (!discount) {
                throw new NotFoundException(`Discount with ID ${createOrderDto.discountId} not found`);
            }
            if (!order.discount) {
                order.discount = [];
            }
            order.discount.push(discount);
            // Attach order products to the order
            order.orderProducts = orderProducts;
    
            // Commit transaction
            await queryRunner.commitTransaction();
    
            return {
                message: 'Order created successfully',
                data: order,
            };
        } catch (error) {
            console.error('Error during order creation transaction:', error);
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException('Failed to create order');
        } finally {
            await queryRunner.release();
        }
    }
    
    

    async findAll(user: any) {
        try {
            const orders = await this.orderRepo.find({
                where: { customer: { id: user.id } },
            });
            return {
                message: 'List of orders',
                data: orders,
            };
        } catch (error) {
            throw new InternalServerErrorException('Error retrieving orders');
        }
    }

    async findAllOrder() {
        try {
            const orders = await this.orderRepo.find(
                {relations: ['customer', 'orderProducts', 'orderProducts.product']}
            );
            return {
                message: 'List of orders',
                data: orders,
            };
        } catch (error) {
            throw new InternalServerErrorException('Error retrieving orders');
        }
    }

    async findOne(id: string) {
        const order = await this.orderRepo.findOneBy({ id });
        if (!order) {
            throw new ExceptionEntityNotFound('Order', id);
        }
        return {
            message: 'Order details',
            data: order,
        };
    }

    async update(id: string, updateOrderDto: UpdateOrderDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const order = await queryRunner.manager.findOne(Order, {
                where: { id },
            });
            if (!order) throw new ExceptionEntityNotFound('Order', id);

            await queryRunner.manager.update(Order, { id }, updateOrderDto);
            await queryRunner.commitTransaction();
            return { message: 'Order updated successfully' };
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException('Failed to update order');
        } finally {
            await queryRunner.release();
        }
    }

    async remove(id: string): Promise<DeleteResult> {
        const deleteResult = await this.orderRepo.delete(id);
        if (!deleteResult.affected) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }
        return deleteResult;
    }

    async maxOrderId() {
        const result = await this.dataSource
        .createQueryBuilder()
        .select('MAX(order.orderIdd)', 'maxOrderIdd')
        .from('order', 'order')
        .getRawOne();

    return {
      message: 'Max Order ID',
      data: result?.maxOrderIdd+1 || null,
    };
    }
    
}

