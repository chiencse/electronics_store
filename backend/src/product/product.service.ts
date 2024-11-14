import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ImageProduct } from './entities/imageProduct.entity';
import { ProductVariant } from './entities/productVariants.entity';
import { PageOptionDto } from 'src/common/paging/pageOption.dto';
import { PageMetaDto } from 'src/common/paging/pageMeta.dto';
import { PageDto } from 'src/common/paging/page.dto';
import { UpdateProductVariantsDto } from './dto/update-productVariant.dto';
import { CreatePropertyProductDto } from './dto/create-property.dto';
import { UpdateProductImageDto } from './dto/update-productImage.dto';

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

    async findAll(pageOption: PageOptionDto) {
        const queryBuilder =
            this.productRepository.createQueryBuilder('product');
        queryBuilder
            .orderBy('product.id', pageOption.orderBy)
            .skip(pageOption.skip)
            .take(pageOption.take);

        const totalItems = await queryBuilder.getCount();
        const listUser = (await queryBuilder.getRawAndEntities()).entities;
        const pageMeta = new PageMetaDto(totalItems, pageOption);
        return new PageDto<Product>(listUser, pageMeta);
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

    async updateProductImages(
        id: string,
        imageUpdates: UpdateProductImageDto[],
    ) {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: ['imageProducts'],
        });
        if (!product) throw new NotFoundException('Product not found.');

        // Xử lý thêm, cập nhật
        imageUpdates.map((imageUpdate) => {
            if (imageUpdate.id) {
            // Cập nhật ảnh
            const image = product.imageProducts.find(
                (img) => img.id === imageUpdate.id,
            );
            if (image) {
                image.imageUrl = imageUpdate.imageUrl;
            } else {
                throw new NotFoundException(
                'Image not found in this product',
                );
            }
            } else {
            // Thêm mới ảnh
            const newImage = this.imageProductRepository.create({
                imageUrl: imageUpdate.imageUrl,
                product: product,
            });
            product.imageProducts.push(newImage);
            }
        });
        return this.productRepository.save(product);
    }

    async updateProductVariants(
        id: string,
        variantUpdates: UpdateProductVariantsDto[],
    ) {
        const product = await this.productRepository.findOne({
            where: { id: id },
            relations: ['variants'],
        });
        if (!product) throw new NotFoundException('Product not found');

        for (const variantUpdate of variantUpdates) {
            if (variantUpdate.id) {
                const variant = product.variants.find(
                    (v) => v.id === variantUpdate.id,
                );
                if (variant) {
                    Object.assign(variant, variantUpdate);
                } else {
                    throw new NotFoundException(
                        'Variant not found in this product',
                    );
                }
            } else {
                const newVariant = this.productVariantRepository.create({
                    ...variantUpdate,
                    product: product,
                });
                product.variants.push(newVariant);
            }
        }
        return this.productRepository.save(product);
    }

    async updateProductProperties(
        id: string,
        propertiesUpdates: Partial<CreatePropertyProductDto>,
    ) {
        const product = await this.productRepository.findOne({
            where: { id },
        });
        if (!product) throw new NotFoundException('Product not found.');

        Object.assign(product.properties, propertiesUpdates);

        return this.productRepository.save(product);
    }
    async update(id: string, updateProductDto: UpdateProductDto) {
        const product = await this.findOne(id);
        if (!product) throw new NotFoundException('Product not found');
        const { imageProducts, variants, properties, ...productUpdates } =
            updateProductDto;
        Object.assign(product, productUpdates);

        await this.productRepository.save(product);

        if (imageProducts) {
            await this.updateProductImages(id, imageProducts);
        }
        if (variants) {
            await this.updateProductVariants(id, variants);
        }
        if (properties) {
            await this.updateProductProperties(id, properties);
        }
        const updatedProduct = await this.productRepository.findOne({
            where: { id },
            relations: ['imageProducts', 'variants'],
        });
        return updatedProduct;
    }

    async removeProduct(id: string) {
        const product = await this.findOne(id);
        if (!product) throw new NotFoundException('Product is not found');
        return this.productRepository.remove(product);
    }

    async removeImageProduct(id: string) {
        const image = await this.imageProductRepository.findOne({
            where: { id: id },
        });
        if (!image) throw new NotFoundException('Image is not found');
        return this.imageProductRepository.remove(image);
    }

    async removeVariantProduct(id: string) {
        const variant = await this.productVariantRepository.findOne({
            where: { id: id },
        });
        if (!variant) throw new NotFoundException('Variant is not found');
        return this.productVariantRepository.remove(variant);
    }
}
