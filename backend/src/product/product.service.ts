import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ImageProduct } from './entities/imageProduct.entity';
import { ProductVariant } from './entities/productVariants.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(ImageProduct)
        private readonly imageProductRepository: Repository<ImageProduct>,
        @InjectRepository(ProductVariant)
        private readonly productVariantRepository: Repository<ProductVariant>,
    ) {}

    async create(createProductDto: CreateProductDto) {
        const product = this.productRepository.create(createProductDto);

        const savedProduct = await this.productRepository.save(product);

        if (
            createProductDto.imageProducts &&
            createProductDto.imageProducts.length > 0
        ) {
            createProductDto.imageProducts.map((imageProductDto) => {
                const imageProduct = this.imageProductRepository.create({
                    imageUrl: imageProductDto.imageUrl,
                    product: savedProduct,
                });
                return imageProduct;
            });
        }

        if (createProductDto.variants && createProductDto.variants.length > 0) {
            createProductDto.variants.map((variantDto) => {
                const productVar = this.productVariantRepository.create({
                    ...variantDto,
                    product: savedProduct,
                });
                return productVar;
            });
        }

        return this.productRepository.save(savedProduct);
    }

    async findAll() {
        return await this.productRepository.find();
    }

    async findOne(id: string) {
        const product = await this.productRepository.findOne({
            where: { id: id },
            relations: {
                imageProducts: true,
                variants: true,
            },
        });
        if (!product) throw new NotFoundException('Product not found.');
        return product;
    }

    update(id: number, updateProductDto: UpdateProductDto) {
        return `This action updates a #${id} product`;
    }

    remove(id: number) {
        return `This action removes a #${id} product`;
    }
}
