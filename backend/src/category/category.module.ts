import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmModule.forFeature([Category]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async () => ({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: process.env.JWT_EXPIRATION },
            }),
        }),

        AuthModule,
    ],
    controllers: [CategoryController],
    providers: [CategoryService],
    exports: [CategoryService],
})
export class CategoryModule {}
