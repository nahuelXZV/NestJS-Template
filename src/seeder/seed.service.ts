import { Injectable, Logger } from '@nestjs/common';
import { handlerError } from 'src/common/utils/handlerError.utils';

import { ROLES } from 'src/common/constants';
import { CreateUserDto } from 'src/users/dto';
import { UserService } from 'src/users/services/users.service';

@Injectable()
export class SeedService {
  private readonly logger = new Logger('SeederService');

  constructor(private readonly userService: UserService) { }

  public async runSeeders() {
    if (process.env.APP_PROD == true) return { message: 'No se puede ejecutar seeders en producción' };
    try {
      const user: CreateUserDto = {
        nombre: 'nahuel',
        apellido: 'zalazar',
        email: 'nahuel@live.com',
        password: '123456789',
        role: ROLES.ADMIN,
      }
      await this.userService.createUser(user);
      return { message: 'Seeders ejecutados correctamente' };
    } catch (error) {
      handlerError(error, this.logger);
    }
  }
}
