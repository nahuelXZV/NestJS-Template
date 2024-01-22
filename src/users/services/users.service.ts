import { Repository } from 'typeorm';
import { BadRequestException, Injectable, Logger, NotFoundException, UnauthorizedException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto, UpdateUserDto } from '../dto/';
import { UsersEntity } from '../entities/users.entity';
import { handlerError } from '../../common/utils/handlerError.utils';
import { QueryDto } from '../../common/dto/query.dto';
import { ResponseMessage } from '../../common/interfaces/responseMessage.interface';

@Injectable()
export class UserService {
  private readonly logger = new Logger('UserService');

  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) { }

  public async findAll(queryDto: QueryDto): Promise<UsersEntity[]> {
    try {
      const { limit, offset, order, attr, value } = queryDto;
      const query = this.userRepository.createQueryBuilder('user');
      if (limit) query.take(limit);
      if (offset) query.skip(offset);
      if (order) query.orderBy('user.createdAt', order.toLocaleUpperCase() as any);
      if (attr && value) query.where(`user.${attr} ILIKE :value`, { value: `%${value}%` });
      return await query.getMany();
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async createUser(createUserDto: CreateUserDto): Promise<UsersEntity> {
    try {
      createUserDto.password = await this.encryptPassword(createUserDto.password);
      await this.userRepository.save(createUserDto);
      return await this.findOneBy({ key: 'email', value: createUserDto.email, });
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async findOne(id: string): Promise<UsersEntity> {
    try {
      const user: UsersEntity = await this.userRepository.findOne({ where: { id } });
      if (!user) throw new NotFoundException('Usuario no encontrado.');
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
      if (userUpdated.affected === 0) throw new NotFoundException('Usuario no actualizado.');
      return await this.findOne(id);
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async delete(id: string): Promise<ResponseMessage> {
    try {
      const user = await this.findOne(id);
      const deletedUser = await this.userRepository.delete(user.id);
      if (deletedUser.affected === 0) throw new BadRequestException('Usuario no eliminado.');
      return { statusCode: 200, message: 'Usuario eliminado.' };
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async findOneBy({ key, value, }: { key: keyof CreateUserDto; value: any; }) {
    try {
      const user: UsersEntity = await this.userRepository.findOne({ where: { [key]: value } });
      if (!user) throw new NotFoundException('Usuario no encontrado.');
      return user;
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async findOneAuth(id: string): Promise<UsersEntity> {
    try {
      const user: UsersEntity = await this.userRepository.findOne({ where: { id }, });
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
