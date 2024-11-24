import {
    Injectable,
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { Discount } from './entities/discount.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DiscountService {
    constructor(
        @InjectRepository(Discount)
        private readonly discountRepo: Repository<Discount>,
        private readonly dataSource: DataSource,
    ) {}

    async create(createDiscountDto: CreateDiscountDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const newDiscount = this.discountRepo.create(createDiscountDto);
            await queryRunner.manager.save(newDiscount);
            await queryRunner.commitTransaction();
            return {
                message: 'Discount created successfully',
                data: newDiscount,
            };
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException('Error creating discount');
        } finally {
            await queryRunner.release();
        }
    }

    async findAll() {
        try {
            const discounts = await this.discountRepo.find();
            return {
                message: 'Discounts retrieved successfully',
                data: discounts,
            };
        } catch (error) {
            throw new InternalServerErrorException(
                'Error retrieving discounts',
            );
        }
    }

    async findOne(id: string) {
        const discount = await this.discountRepo.findOneBy({ id });
        if (!discount) {
            throw new NotFoundException(`Discount with ID ${id} not found`);
        }
        return {
            message: 'Discount found',
            data: discount,
        };
    }

    async update(id: string, updateDiscountDto: UpdateDiscountDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const discount = await queryRunner.manager.findOne(Discount, {
                where: { id },
            });
            if (!discount) {
                throw new NotFoundException(`Discount with ID ${id} not found`);
            }

            this.discountRepo.merge(discount, updateDiscountDto);
            await queryRunner.manager.save(discount);
            await queryRunner.commitTransaction();
            return {
                message: 'Discount updated successfully',
                data: discount,
            };
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException('Error updating discount');
        } finally {
            await queryRunner.release();
        }
    }

    async remove(id: string) {
        const deleteResult = await this.discountRepo.delete(id);
        if (!deleteResult.affected) {
            throw new NotFoundException(`Discount with ID ${id} not found`);
        }
        return {
            success: true,
            data: deleteResult,
        };
    }
}
