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
import { CurrentUserMiddleware } from 'utility/middleware/current-user.middleware';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRoot(dataSourceOptions),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        UserModule,
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
