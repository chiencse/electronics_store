import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order)
    private orderRepo : Repository<Order>,
    private readonly dataSource: DataSource,
  ) {}


  async create(createOrderDto: CreateOrderDto, user: any) {
    const queryRunner = this.dataSource.createQueryRunner();
    queryRunner.connect();
    queryRunner.startTransaction();
    try {
      // create order

      const customer = await queryRunner.manager.findOneBy(User, { id: user.id });
      const order = queryRunner.manager.create(Order, {
        ...createOrderDto,
        customer: customer,
      });
      await queryRunner.manager.save(order);
      // commit transaction
      await queryRunner.commitTransaction();
      return {
        message: 'Order created successfully',
        data: order
      };
    } catch (error) {
      // rollback transaction
      await queryRunner.rollbackTransaction();
      throw new Error(error.message);
    } finally {
      // release query runner
      await queryRunner.release();
    }
  }

  async findAll(user : any) {
    const orders = await this.orderRepo.find({
      where: {
        customer: {
          id: user.id
        }
      }
    });
    return {
      message: 'List of orders',
      data: orders
    };
}

  async findOne(id: string): Promise<any> {

    const order = await this.orderRepo.findOneBy({id: id});

    if (!order) {
      throw new Error('Order not found');
    }
    return {
      message: 'Order details',
      data: order
    };
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    queryRunner.connect();
    queryRunner.startTransaction();

    try {
      await queryRunner.manager.update(Order, { id: id }, updateOrderDto);
      await queryRunner.commitTransaction();
      return {
        message: 'Order updated successfully',
      };
    }
    catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(error.message);
    }
    finally {
      await queryRunner.release();
    }
  }

  remove(id: string) : Promise<DeleteResult> {
    return this.orderRepo.delete(id);
  }
}
