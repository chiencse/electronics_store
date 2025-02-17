import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { DataSource, Repository } from 'typeorm';
import { ProductService } from 'src/product/product.service';
import { AuthPayload } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { CartProduct } from './entities/cartProduct.entity';
import { InsertCartDto } from './dto/insert-cart.dto';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>,
        @InjectRepository(CartProduct)
        private readonly cartProductRepository: Repository<CartProduct>,
        private readonly productService: ProductService,
        private readonly dataSource: DataSource,
        private readonly userService: UserService,
    ) {}

    async insert(cartdto: InsertCartDto, user: AuthPayload) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const pd = await this.productService.findOne(cartdto.productId);

            if (!pd) {
                throw new NotFoundException('Product not found');
            }

            // Kiểm tra nếu đã có giỏ hàng của user
            const existingCart = await this.cartRepository.findOne({
                where: { user: { id: user.id } },
            });

            if (existingCart) {
                // Kiểm tra nếu sản phẩm đã tồn tại trong giỏ hàng
                const existingCartProduct =
                    await this.cartProductRepository.findOne({
                        where: {
                            cart: { id: existingCart.id },
                            product: { id: pd.id },
                            variantId: cartdto.variantId,
                        },
                    });

                if (existingCartProduct) {
                    // Tăng số lượng sản phẩm nếu đã tồn tại
                    existingCartProduct.quantity += 1;
                    await this.cartProductRepository.save(existingCartProduct);
                } else {
                    // Thêm sản phẩm mới vào giỏ hàng
                    const newCartProduct = new CartProduct();
                    newCartProduct.cart = existingCart;
                    newCartProduct.product = pd;
                    newCartProduct.quantity = 1;
                    newCartProduct.variantId = cartdto.variantId;
                    await this.cartProductRepository.save(newCartProduct);
                }
            } else {
                // Tạo giỏ hàng mới nếu chưa tồn tại
                const crtUser = await this.userService.findOne(user.id);
                const newCart = new Cart();
                newCart.user = crtUser;
                await this.cartRepository.save(newCart);

                // Thêm sản phẩm đầu tiên vào giỏ hàng mới
                const newCartProduct = new CartProduct();
                newCartProduct.cart = newCart;
                newCartProduct.product = pd;
                newCartProduct.quantity = 1; // Hoặc giá trị mặc định khác
                newCartProduct.variantId = cartdto.variantId;
                await this.cartProductRepository.save(newCartProduct);
            }
            await queryRunner.commitTransaction();
            return {
                message: 'Cart created successfully',
            };
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new BadRequestException(error.message);
        } finally {
            await queryRunner.release();
        }
    }

    async findAll(user: AuthPayload) {
        const listProduct = await this.cartRepository
            .createQueryBuilder('cart')
            .leftJoin('cart.cartProducts', 'cartProduct')
            .leftJoin('cartProduct.product', 'product')
            .leftJoin('product.variants', 'ProductVariant')
            .leftJoin('product.imageProducts', 'ImageProduct')
            .leftJoin('product.discounts', 'discount')
            .leftJoin('cart.user', 'user')
            .where('user.id = :id', { id: user.id })
            .where('cartProduct.variantId = productVariant.id')
            .select([
                'product.id',
                'product.name',
                'discount.id',
                'discount.amountDiscount',
                'discount.discountPercentage',
                'cartProduct.quantity',
                'cartProduct.variantId',
                'ProductVariant.ram',
                'ProductVariant.rom',
                'ProductVariant.cpu',
                'ProductVariant.color',
                'ProductVariant.price',
                'ImageProduct.imageUrl',
            ])
            .getRawMany();
            
            const filteredCart = listProduct.reduce((acc, item) => {
                const existingProduct = acc.find(p => p.cartProduct_variantId === item.cartProduct_variantId);
                if (!existingProduct) {
                  acc.push(item);
                }
                return acc;
              }, []);

        return filteredCart;
    }

    async remove(deleteDto: InsertCartDto, user: AuthPayload) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            // Kiểm tra nếu đã có giỏ hàng của user
            const existingCart = await this.cartRepository.findOne({
                where: { user: { id: user.id } },
            });

            const existingCartProduct =
                await this.cartProductRepository.findOne({
                    where: {
                        cart: { id: existingCart.id },
                        product: { id: deleteDto.productId },
                        variantId: deleteDto.variantId,
                    },
                });

            if (existingCartProduct) {
                console.log(existingCartProduct.quantity);
                existingCartProduct.quantity -= 1;
                if (existingCartProduct.quantity == 0) {
                    await this.cartProductRepository.delete(
                        existingCartProduct.id,
                    );
                }
                else {
                    await this.cartProductRepository.save(existingCartProduct);
                }
            }
            await queryRunner.commitTransaction();
            return {
                message: 'delete Successfully',
            };
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new BadRequestException(error.message);
        } finally {
            await queryRunner.release();
        }
    }

    async removeAll(deleteDto: InsertCartDto, user: AuthPayload) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            // Kiểm tra nếu đã có giỏ hàng của user
            const existingCart = await this.cartRepository.findOne({
                where: { user: { id: user.id } },
            });

            const existingCartProduct =
                await this.cartProductRepository.findOne({
                    where: {
                        cart: { id: existingCart.id },
                        product: { id: deleteDto.productId },
                        variantId: deleteDto.variantId,
                    },
                });

            if (existingCartProduct) {
                    await this.cartProductRepository.delete(
                        existingCartProduct.id,
                    );
            }
            await queryRunner.commitTransaction();
            return {
                message: 'delete Successfully',
            };
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new BadRequestException(error.message);
        } finally {
            await queryRunner.release();
        }
    }
}
