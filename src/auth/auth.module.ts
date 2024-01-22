import { Global, Module } from '@nestjs/common';

import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UserService } from '../users/services/users.service';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [UsersModule, ConfigModule],
  providers: [AuthService, UserService],
  controllers: [AuthController],
})
export class AuthModule { }
