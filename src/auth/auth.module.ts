import { Global, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UserService } from 'src/users/services/users.service';
import { UsersModule } from 'src/users/users.module';

@Global()
@Module({
  imports: [UsersModule],
  providers: [AuthService, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
