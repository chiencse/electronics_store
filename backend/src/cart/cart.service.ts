import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { DataSource, Repository } from 'typeorm';
import { ProductService } from 'src/product/product.service';
import { AuthPayload } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';


@Injectable()
export class CartService {

  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    private readonly productService: ProductService,
    private readonly dataSource : DataSource,
    private readonly userService: UserService
  ) {}

  async insert(id: string, user: AuthPayload) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const pd = await this.productService.findOne(id)

      const existingCart = await this.cartRepository.findOne({
         where: {
          user: {id : user.id}
         } 
      });
      
      if (existingCart) {

        if (existingCart.products.find(p => p.id === pd.id)) {
          throw new ConflictException('Product already exists in cart');
        }
        existingCart.products.push(pd);
        await this.cartRepository.save(existingCart);
      } else {
        const crtUser = await this.userService.findOne(user.id);
        const newCart = new Cart();
        newCart.user = crtUser;
        newCart.products = [pd];
        await this.cartRepository.save(newCart);
      }

      await queryRunner.commitTransaction();
      return {
        message: 'Cart created successfully',
      };
    }
    catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(error.message);
    }
    finally {
      await queryRunner.release();
    }

  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number) {
    return `This action updates a #${id} cart`;
  }

  remove(id: string) {
    return `This action removes a #${id} cart`;
  }
}
