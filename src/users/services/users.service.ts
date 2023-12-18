import { Repository } from 'typeorm';
import { BadRequestException, Injectable, Logger, UnauthorizedException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto, UpdateUserDto } from '../dto/';
import { UsersEntity } from '../entities/users.entity';
import { QueryDto } from 'src/common/dto/query.dto';
import { handlerError } from 'src/common/utils/handlerError.utils';
import { DeleteMessage } from 'src/common/interfaces/delete-message.interface';

@Injectable()
export class UserService {
  private readonly logger = new Logger('UserService');

  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) { }

  public async findAll(query: QueryDto): Promise<UsersEntity[]> {
    try {
      const { limit, offset } = query;
      if (limit && offset) return await this.userRepository.find({ take: limit, skip: offset });
      if (limit) return await this.userRepository.find({ take: limit });
      return await this.userRepository.find();
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async createUser(createUserDto: CreateUserDto): Promise<UsersEntity> {
    try {
      createUserDto.password = await this.encryptPassword(createUserDto.password);
      const user: UsersEntity = await this.userRepository.save(createUserDto);
      return user;
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async findOne(id: string): Promise<UsersEntity> {
    try {
      const user: UsersEntity = await this.userRepository.findOneOrFail({ where: { id } });
      return user;
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async update(id: string, updateUserDto: UpdateUserDto,): Promise<UsersEntity> {
    try {
      if (updateUserDto.password) updateUserDto.password = await this.encryptPassword(updateUserDto.password);
      const user: UsersEntity = await this.findOne(id);
      const userUpdated = await this.userRepository.update(user.id, updateUserDto,);
      if (userUpdated.affected === 0) throw new BadRequestException('Usuario no actualizado.');
      const userFind: UsersEntity = await this.findOne(id);
      return userFind;
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async delete(id: string): Promise<DeleteMessage> {
    try {
      const user = await this.findOne(id);
      const deletedUser = await this.userRepository.delete(user.id);
      if (deletedUser.affected === 0) throw new BadRequestException('Usuario no eliminado.');
      return { deleted: true, message: 'Usuario eliminado.' };
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async findOneBy({ key, value, }: { key: keyof CreateUserDto; value: any; }) {
    try {
      const user: UsersEntity = await this.userRepository.findOneOrFail({ where: { [key]: value } });
      return user;
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async findOneAuth(id: string): Promise<UsersEntity> {
    try {
      const user: UsersEntity = await this.userRepository.findOneOrFail({ where: { id }, });
      if (!user) throw new UnauthorizedException('Usuario asociado al token no encontrado.',);
      return user;
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  private async encryptPassword(password: string): Promise<string> {
    return bcrypt.hashSync(password, +process.env.HASH_SALT);
  }
}
