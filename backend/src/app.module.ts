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
