import { Repository, UpdateResult } from 'typeorm';
import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { UserDTO, UserUpdateDTO } from '../dto/';
import { UsersEntity } from '../entities/users.entity';

@Injectable()
export class UsersService {
    private readonly logger = new Logger('UsersService');

    constructor(
        @InjectRepository(UsersEntity) private readonly userRepository: Repository<UsersEntity>
    ) { }

    public async findAll(): Promise<UsersEntity[]> {
        try {
            const users: UsersEntity[] = await this.userRepository.find({
                where: { isDeleted: false },
            });
            if (!users) throw new NotFoundException('No hay usuarios registrados.');
            return users;
        } catch (error) {
            this.handlerError(error);
        }
    }

    public async createUser(body: UserDTO): Promise<UsersEntity> {
        try {
            body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT); // Hash password
            const user: UsersEntity = await this.userRepository.save(body);
            if (!user) throw new BadRequestException('Usuario no creado.');
            return user;
        } catch (error) {
            this.handlerError(error);
        }
    }

    public async findOne(id: string): Promise<UsersEntity> {
        try {
            const user: UsersEntity = await this.userRepository.createQueryBuilder('user').where('user.id = :id', { id })
                .andWhere('user.isDeleted = false').getOne();
            if (!user) throw new NotFoundException('Usuario no encontrado.');
            return user;
        } catch (error) {
            this.handlerError(error);
        }
    }

    public async update(id: string, body: UserUpdateDTO): Promise<UserUpdateDTO> {
        try {
            if (body.password) body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT); // Hash password (if exists in body)
            const user = await this.findOne(id);
            const userUpdated = await this.userRepository.update(user.id, body);
            if (userUpdated.affected === 0) throw new BadRequestException('Usuario no actualizado.');
            return body;
        } catch (error) {
            this.handlerError(error);
        }
    }

    public async delete(id: string): Promise<{}> {
        try {
            const user = await this.findOne(id);
            user.isDeleted = true;
            await this.userRepository.save(user);
            return { message: 'Usuario eliminado.' };
        } catch (error) {
            this.handlerError(error);
        }
    }

    public async findBy({ key, value }: { key: keyof UserDTO; value: any }) {
        try {
            const user: UsersEntity = await this.userRepository.createQueryBuilder('user').addSelect('user.password').where({ [key]: value }).andWhere(
                'user.isDeleted = false').getOne();
            if (!user) throw new NotFoundException('Usuario no encontrado.');
            return user;
        } catch (error) {
            this.handlerError(error);
        }
    }

    public async findOneAuth(id: string): Promise<UsersEntity> {
        try {
            const user: UsersEntity = await this.userRepository.createQueryBuilder('user').where('user.id = :id', { id }).andWhere('user.isDeleted = false').getOne();
            if (!user) throw new UnauthorizedException('Usuario asociado al token no encontrado.');
            return user;
        } catch (error) {
            this.handlerError(error);
        }
    }

    handlerError(error: any) {
        this.logger.error(error.message);
        if (error.code === '23505') throw new BadRequestException(error.detail);

        throw new InternalServerErrorException(error.message);
    }
}
