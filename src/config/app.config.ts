export const EnvConfig = () => ({
  APP_NAME: process.env.APP_NAME || 'NestJS',
  APP_PROD: process.env.APP_PROD || false,
  APP_VERSION: process.env.APP_VERSION || "0.0.1",
  DOCKER_IMAGE: process.env.DOCKER_IMAGE || "",
  PORT: process.env.PORT || 3000,

  APP_URL: process.env.APP_URL || 'http://localhost:3000',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:4200',

  DB_CONNECTION: process.env.DB_CONNECTION || 'postgres',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || 5432,
  DB_DATABASE: process.env.DB_DATABASE || 'postgres',
  DB_USERNAME: process.env.DB_USERNAME || 'postgres',
  DB_PASSWORD: process.env.DB_PASSWORD || 'postgres',

  HASH_SALT: process.env.HASH_SALT || 10,
  JWT_AUTH: process.env.JWT_AUTH || 'secret',
  JWT_RECOVERY: process.env.JWT_RECOVERY || 'secret',
});
