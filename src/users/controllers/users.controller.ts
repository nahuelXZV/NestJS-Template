import { Body, Controller, Post, Get, Put, Delete, Param, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger/dist';
import { UpdateResult } from 'typeorm';

import { RolesAccess } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserDTO, UserUpdateDTO } from '../dto/';
import { UsersEntity } from '../entities/users.entity';
import { UsersService } from '../services/users.service';
import { PublicAccess } from 'src/auth/decorators';

@ApiTags('Users')
@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ) { }

    // @RolesAccess('ADMIN')
    @PublicAccess()
    @ApiBearerAuth()
    @Post()
    public async createUser(@Body() body: UserDTO): Promise<UsersEntity> {
        return await this.usersService.createUser(body);
    }

    @ApiBearerAuth()
    @Get()
    public async findAll(): Promise<UsersEntity[]> {
        return await this.usersService.findAll();
    }

    @ApiParam({ name: 'id', type: 'string' })
    @ApiBearerAuth()
    @Get(':id')
    public async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<UsersEntity> {
        return await this.usersService.findOne(id);
    }

    @ApiParam({ name: 'id', type: 'string' })
    @ApiBearerAuth()
    @Put(':id')
    public async update(@Param('id', ParseUUIDPipe) id: string, @Body() body: UserUpdateDTO): Promise<UserUpdateDTO> {
        return await this.usersService.update(id, body);
    }

    @RolesAccess('ADMIN')
    @ApiParam({ name: 'id', type: 'string' })
    @ApiBearerAuth()
    @Delete(':id')
    public async delete(@Param('id', ParseUUIDPipe) id: string): Promise<{}> {
        return await this.usersService.delete(id);
    }

}
