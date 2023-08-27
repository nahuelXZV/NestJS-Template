import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ApiParam, ApiQuery } from '@nestjs/swagger';

import { ExampleService } from '../services/example.service';
import { AuthGuard, RolesGuard } from 'src/auth/guards';
import { CreateExampleDto } from '../dto/create-example.dto';
import { QueryDto } from 'src/common/dto/query.dto';
import { UpdateExampleDto } from '../dto/update-example.dto';
import { ExampleEntity } from '../entities/example.entity';
import { DeleteMessage } from 'src/common/interfaces/delete-message.interface';
import { RolesAccess } from 'src/auth/decorators';

@UseGuards(AuthGuard, RolesGuard)
@Controller('example')
export class ExampleController {

  constructor(private readonly exampleService: ExampleService) { }

  @Post()
  create(@Body() createExampleDto: CreateExampleDto): Promise<ExampleEntity> {
    return this.exampleService.create(createExampleDto);
  }

  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'offset', type: 'number', required: false })
  @Get()
  findAll(@Query() queryDto: QueryDto): Promise<ExampleEntity[]> {
    return this.exampleService.findAll(queryDto);
  }

  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ExampleEntity> {
    return this.exampleService.findOne(id);
  }

  @ApiParam({ name: 'id', type: 'string' })
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateExampleDto: UpdateExampleDto): Promise<ExampleEntity> {
    return this.exampleService.update(id, updateExampleDto);
  }

  @RolesAccess('ADMIN')
  @ApiParam({ name: 'id', type: 'string' })
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<DeleteMessage> {
    return this.exampleService.remove(id);
  }
}
