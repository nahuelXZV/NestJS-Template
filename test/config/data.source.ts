import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

ConfigModule.forRoot({ envFilePath: '.env.test' });
const configService = new ConfigService();

export const DataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  entities: [__dirname + '/../../src/**/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../../src/migrations/*{.ts,.js}'],
  // synchronize: configService.get('APP_PROD') === 'true' ? true : false,
  synchronize: false,
  logging: false,
  extra: {
    ssl:
      configService.get('APP_PROD') === 'true'
        ? { rejectUnauthorized: false }
        : null,
    timezone: 'America/La_Paz'
  },
  namingStrategy: new SnakeNamingStrategy(),
};

export const AppDS = new DataSource(DataSourceConfig);
