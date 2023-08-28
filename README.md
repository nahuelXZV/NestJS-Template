<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

Template para iniciar un proyecto con NestJS, TypeORM, Postgres, Swagger, Passport, JWT, Docker, etc.

## Installation with Docker

Copiar el .env.example y renombrarlo a .env. luego modificar las variables de entorno en el archivo .env

```bash
$ docker-compose up -d
```

Al ejecutar el comando anterior, se crean los contenedores de la base de datos y la aplicación, tambien se crean las tablas en la base de datos.

- El puerto por defecto para acceder a la base de datos desde un cliente como DBeaver es el 5440. Este se pueden cambiar en el archivo docker-compose.yml
- El usuario por defecto para acceder a la base de datos es el siguiente:

```bash
user: postgres
```

## Installation without Docker

```bash
$ npm install
```

## Environments

Copiar el .env.example y renombrarlo .env, luego configurar las variables de entorno en el archivo .env

## Migrations (opcional)

Las tablas se crean automaticamente al iniciar el proyecto, pero si se desea crear las migraciones manualmente se puede hacer de la siguiente manera:

1. Ir al archivo src/config/data.source.ts
2. Cambiar el valor de synchronize a false
3. Ejecutar los siguientes comandos:

```bash
# create migrations
$ npm run m:gen -- ./src/migrations/init

# run migrations
$ npm run m:run
```

## Running the app

```bash
# development
$ npm run start:dev

# production mode
$ npm run start
$ npm run start:prod
```

## Swagger

Para ver la documentación de la API, ir a la siguiente url: http://localhost:3000/docs (cambiar el puerto si es necesario)

## Seeder (opcional)

Para crear el usuario administrador, Ir al siguiente endpoint: http://localhost:3000/api/seed (cambiar el puerto si es necesario)

## License

Nest is [MIT licensed](LICENSE).
