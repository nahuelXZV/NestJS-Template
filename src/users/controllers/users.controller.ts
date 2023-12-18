import { Body, Controller, Get, Delete, Param, UseGuards, ParseUUIDPipe, Query, Patch, } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger/dist';

import { RolesAccess } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UpdateUserDto } from '../dto/';
import { UsersEntity } from '../entities/users.entity';
import { UserService } from '../services/users.service';
import { QueryDto } from 'src/common/dto/query.dto';
import { DeleteMessage } from 'src/common/interfaces/delete-message.interface';

@ApiTags('Users')
@Controller('user')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly userService: UserService) { }

  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'offset', type: 'number', required: false })
  @Get()
  public async findAll(@Query() queryDto: QueryDto): Promise<UsersEntity[]> {
    return await this.userService.findAll(queryDto);
  }

  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  public async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<UsersEntity> {
    return await this.userService.findOne(id);
  }

  @ApiParam({ name: 'id', type: 'string' })
  @Patch(':id')
  public async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto): Promise<UsersEntity> {
    return await this.userService.update(id, updateUserDto);
  }

  @RolesAccess('ADMIN')
  @ApiParam({ name: 'id', type: 'string' })
  @Delete(':id')
  public async delete(@Param('id', ParseUUIDPipe) id: string): Promise<DeleteMessage> {
    return await this.userService.delete(id);
  }
}
