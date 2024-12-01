import {
    Global,
    MiddlewareConsumer,
    Module,
    RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../ormconfig';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { FilesAzureService } from './modules/files/files.service';
import { AuthModule } from './auth/auth.module';
import { CurrentUserMiddleware } from 'ultility/middleware/current-user.middleware';
import { ProductModule } from './product/product.module';
import { MailModule } from './mail/mail.module';
import { DiscountModule } from './discount/discount.module';
import { OrderModule } from './order/order.module';
import { FilesModule } from './modules/files/file.module';
import { RedisModule } from './modules/redis/redis.module';
import { CartModule } from './cart/cart.module';
import { CategoryModule } from './category/category.module';
import { ReviewModule } from './review/review.module';
import { VnpayModule } from 'nestjs-vnpay';
import { VNpayModule } from './VNpay/VNpay.module';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRoot(dataSourceOptions),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        AuthModule,
        UserModule,
        ProductModule,
        MailModule,

        OrderModule,
        RedisModule,
        FilesModule,
        DiscountModule,
        CartModule,

        CategoryModule,
        VNpayModule,
        ReviewModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(CurrentUserMiddleware).forRoutes({
            path: '*',
            method: RequestMethod.ALL,
        }); // áp dụng cho tất cả các route trong module
    }
}
