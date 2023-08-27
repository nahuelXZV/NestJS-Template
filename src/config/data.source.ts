import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

ConfigModule.forRoot({ envFilePath: '.env' });
const configService = new ConfigService();

export const DataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: configService.get('APP_PROD') === 'true' ? true : false,
  logging: false,
  migrationsRun: true,
  ssl: configService.get('APP_PROD') === 'true' ? true : false,
  extra: {
    ssl:
      configService.get('APP_PROD') === 'true'
        ? { rejectUnauthorized: false }
        : null,
  },
  namingStrategy: new SnakeNamingStrategy(),
};

export const AppDS = new DataSource(DataSourceConfig);
