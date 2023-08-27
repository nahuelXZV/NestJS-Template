import { Injectable } from '@nestjs/common';

import { ROLES } from 'src/constants';
import { CreateUserDto } from 'src/users/dto';
import { UserService } from 'src/users/services/users.service';

@Injectable()
export class SeedService {
  constructor(private readonly userService: UserService) { }

  async runSeeders() {
    try {
      if (process.env.APP_PROD == true) return { message: 'No se puede ejecutar seeders en producción' };
      await this.createUsers();
      return { message: 'Seeders ejecutados correctamente' };
    } catch (error) {
      return { message: 'Error al ejecutar seeders', error };
    }
  }

  async createUsers() {
    const users: CreateUserDto[] = [
      {
        nombre: 'nahuel',
        apellido: 'zalazar',
        email: 'nahuel@live.com',
        password: '123456789',
        role: ROLES.ADMIN,
      },
    ];
    users.forEach(async (user) => {
      await this.userService.createUser(user);
    });
  }
}
