import { Module } from '@nestjs/common';
import { UserService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  providers: [UserService],
  controllers: [UsersController],
  exports: [UserService, TypeOrmModule],
})
export class UsersModule {}
