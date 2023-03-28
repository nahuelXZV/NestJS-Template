import { Body, Controller, Post, Get, Put, Delete, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiParam, ApiTags, ApiResponse } from '@nestjs/swagger/dist';
import { RolesAccess } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UpdateResult } from 'typeorm';
import { UserDTO, UserUpdateDTO } from '../dto/user.dto';
import { UsersEntity } from '../entities/users.entity';
import { UsersService } from '../services/users.service';

@ApiTags('Users')
@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ) { }

    @ApiBearerAuth()
    @RolesAccess('ADMIN')
    @Post()
    public async createUser(@Body() body: UserDTO): Promise<UsersEntity> {
        return await this.usersService.createUser(body);
    }

    @ApiBearerAuth()
    @Get()
    public async findAll(): Promise<UsersEntity[]> {
        return await this.usersService.findAll();
    }

    @ApiBearerAuth()
    @ApiParam({ name: 'id', type: 'string' })
    @Get(':id')
    public async findOne(@Param('id') id: string): Promise<UsersEntity> {
        return await this.usersService.findOne(id);
    }

    @ApiBearerAuth()
    @ApiParam({ name: 'id', type: 'string' })
    @Put(':id')
    public async update(@Param('id') id: string, @Body() body: UserUpdateDTO): Promise<UpdateResult> {
        return await this.usersService.update(id, body);
    }

    @RolesAccess('ADMIN')
    @ApiBearerAuth()
    @ApiParam({ name: 'id', type: 'string' })
    @Delete(':id')
    public async delete(@Param('id') id: string): Promise<void> {
        await this.usersService.delete(id);
    }

}
