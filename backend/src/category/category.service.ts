import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { categories } from './categories.data';
@Injectable()
export class CategoryService implements OnModuleInit {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) { }
    async onModuleInit() {
        console.log('Checking predefined categories...');
        for (const predefinedCategory of categories) {
            const existingCategory = await this.categoryRepository.findOne({
                where: { title: predefinedCategory.title },
            });

            if (!existingCategory) {

                // console.log(`Inserting category:`, predefinedCategory);


                await this.categoryRepository.save(predefinedCategory);
                // console.log(`Category "${predefinedCategory.title}" added.`);
            }
        }
        console.log('Predefined categories initialized.');
    }

    async create(createCategoryDto: CreateCategoryDto) {
        const category = this.categoryRepository.create(createCategoryDto);
        return await this.categoryRepository.save(category);
    }

    async findAll() {
        return await this.categoryRepository.find();
    }

    async findOne(id: string) {
        const category = await this.categoryRepository.findOne({
            where: { id: id },
            relations: ['products'],
        });
        if (!category) throw new NotFoundException('Category is not found');
        return category;
    }

    async update(id: string, updateCategoryDto: UpdateCategoryDto) {
        const category = await this.findOne(id);

        Object.assign(category, updateCategoryDto);

        return await this.categoryRepository.save(category);
    }

    async remove(id: string) {
        const category = await this.findOne(id);

        return await this.categoryRepository.remove(category);
    }
}
