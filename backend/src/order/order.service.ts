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
import { Invoice } from './entities/invoice.entity';
import { CreateInvoiceDto } from './dto/createInvoice.dto';
import { ExceptionEntityNotFound } from 'src/common';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private orderRepo: Repository<Order>,
        private readonly dataSource: DataSource,
    ) {}

    async create(createOrderDto: CreateOrderDto, user: any) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // Find customer
            const customer = await queryRunner.manager.findOneBy(User, {
                id: user.id,
            });
            const { hash_password, username, salt, roles, ...safeCustomer } =
                customer;
            if (!customer)
                throw new NotFoundException(
                    `User with ID ${user.id} not found`,
                );

            // Create and save order
            const order = queryRunner.manager.create(Order, {
                ...createOrderDto,
                customer: safeCustomer,
            });
            await queryRunner.manager.save(order);

            await queryRunner.commitTransaction();
            return {
                message: 'Order created successfully',
                data: order,
            };
        } catch (error) {
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

    async generateInvoice(data: CreateInvoiceDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const order = await queryRunner.manager.findOneBy(Order, {
                id: data.orderId,
            });
            if (!order) {
                throw new NotFoundException('Order not found');
            }

            // Create and save invoice
            const invoice = queryRunner.manager.create(Invoice, {
                total: data.total,
                order: order,
            });
            await queryRunner.manager.save(invoice);

            await queryRunner.commitTransaction();
            return {
                message: 'Invoice generated successfully',
                data: invoice,
            };
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException(
                'Failed to generate invoice',
            );
        } finally {
            await queryRunner.release();
        }
    }
}
