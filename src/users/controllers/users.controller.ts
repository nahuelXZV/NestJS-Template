import { Body, Controller, Get, Delete, Param, UseGuards, ParseUUIDPipe, Query, Patch, } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger/dist';

import { RolesAccess } from '../../auth/decorators/roles.decorator';
import { AuthGuard, RolesGuard } from '../../auth/guards/';
import { UpdateUserDto } from '../dto/';
import { UserService } from '../services/users.service';
import { QueryDto } from '../../common/dto/query.dto';
import { ResponseMessage } from 'src/common/interfaces/responseMessage.interface';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UserService) { }

  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'offset', type: 'number', required: false })
  @ApiQuery({ name: 'order', type: 'string', required: false })
  @ApiQuery({ name: 'attr', type: 'string', required: false })
  @ApiQuery({ name: 'value', type: 'string', required: false })
  @Get()
  public async findAll(@Query() queryDto: QueryDto): Promise<ResponseMessage> {
    return {
      statusCode: 200,
      data: await this.userService.findAll(queryDto),
    };
  }

  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  public async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseMessage> {
    return {
      statusCode: 200,
      data: await this.userService.findOne(id),
    }
  }

  @ApiParam({ name: 'id', type: 'string' })
  @Patch(':id')
  public async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto): Promise<ResponseMessage> {
    return {
      statusCode: 200,
      data: await this.userService.update(id, updateUserDto),
    };
  }

  @RolesAccess('ADMIN')
  @ApiParam({ name: 'id', type: 'string' })
  @Delete(':id')
  public async delete(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseMessage> {
    return await this.userService.delete(id);
  }
}
