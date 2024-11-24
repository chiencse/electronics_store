import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

// export const dataSourceOptions: DataSourceOptions = {
//     type: (process.env.TYPE as any) ?? 'mysql',
//     host: process.env.DB_HOST,
//     port: parseInt(process.env.DB_PORT, 10) ?? 3306,
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     synchronize: false,
//     bigNumberStrings: true,
//     multipleStatements: true,
//     logging: true,
//     entities: ['dist/**/*.entity.{ts,js}'],
//     migrations: ['dist/database/migrations/*.js'],
//     migrationsRun: true,
// };

export const dataSourceOptions: DataSourceOptions = {
    type: (process.env.TYPE_AZURE as any) ?? 'mysql',
    host: process.env.HOST_DB_AZURE,
    port: parseInt(process.env.PORT_DB_AZURE, 10) ?? 3306,
    username: process.env.USER_DB_AZURE,
    password: process.env.PASSWORD_DB_AZURE,
    database: process.env.DATABASE_DB_AZURE,
    synchronize: true,
    bigNumberStrings: true,
    multipleStatements: true,
    logging: true,
    entities: ['dist/**/*.entity.{ts,js}'],
    migrations: ['dist/database/migrations/*.js'],
    migrationsRun: true,
    extra: {
        ssl: {
          rejectUnauthorized: false, // Optional; required if Azure uses self-signed certificates
        },
      },
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
