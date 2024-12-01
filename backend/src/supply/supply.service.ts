import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSupplyDto } from './dto/create-supply.dto';
import { UpdateSupplyDto } from './dto/update-supply.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './entities/supply.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SupplyService {
    constructor(
        @InjectRepository(Supplier)
        private readonly supplyRepository: Repository<Supplier>,
    ) {}
    async create(createSupplyDto: CreateSupplyDto) {
        const supplier = this.supplyRepository.create(createSupplyDto);
        return await this.supplyRepository.save(supplier);
    }

    async findAll() {
        return await this.supplyRepository.find();
    }

    async findOne(id: string) {
        const supplier = await this.supplyRepository.findOne({
            where: { id: id },
            relations: ['product'],
        });
        if (!supplier) throw new NotFoundException('Supplier is not found');
        return supplier;
    }

    async update(id: string, updateSupplyDto: UpdateSupplyDto) {
        const supplier = await this.findOne(id);
        Object.assign(supplier, updateSupplyDto);
        return await this.supplyRepository.save(supplier);
    }

    async remove(id: string) {
        const supplier = await this.findOne(id);
        return await this.supplyRepository.remove(supplier);
    }
}
