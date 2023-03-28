import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorManager } from 'src/utils/error.manager';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserDTO, UserUpdateDTO } from '../dto/user.dto';
import { UsersEntity } from '../entities/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UsersEntity) private readonly userRepository: Repository<UsersEntity>
    ) { }

    public async findAll(): Promise<UsersEntity[]> {
        try {
            const users: UsersEntity[] = await this.userRepository.find();
            if (!users) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: 'Users not found'
                })
            }
            return users;
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    public async createUser(body: UserDTO): Promise<UsersEntity> {
        try {
            body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT); // Hash password
            const user: UsersEntity = await this.userRepository.save(body);
            if (!user) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'User not created'
                })
            }
            return user;
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    public async findOne(id: string): Promise<UsersEntity> {
        try {
            const user: UsersEntity = await this.userRepository.createQueryBuilder('user').where('user.id = :id', { id }).getOne();
            if (!user) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: 'User not found'
                })
            }
            return user;
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    public async update(id: string, body: UserUpdateDTO): Promise<UpdateResult> {
        try {
            if (body.password) body.password = await bcrypt.hash(body.password, process.env.HASH_SALT); // Hash password (if exists in body)
            const user: UpdateResult = await this.userRepository.update(id, body);
            if (user.affected === 0) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'User not updated'
                })
            }
            return user;
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    public async delete(id: string): Promise<DeleteResult> {
        try {
            const user: DeleteResult = await this.userRepository.delete(id);
            if (user.affected === 0) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'User not deleted'
                })
            }
            return user;
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    public async findBy({ key, value }: { key: keyof UserDTO; value: any }) {
        try {
            const user: UsersEntity = await this.userRepository.createQueryBuilder('user').addSelect('user.password').where({ [key]: value }).getOne();
            return user;
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }


}
