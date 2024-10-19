import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../ormconfig';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRoot(dataSourceOptions),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        UserModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
