import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateExampleDto } from '../dto/create-example.dto';
import { UpdateExampleDto } from '../dto/update-example.dto';
import { ExampleEntity } from '../entities/example.entity';
import { QueryDto } from 'src/common/dto/query.dto';
import { DeleteMessage } from 'src/common/interfaces/delete-message.interface';
import { handlerError } from 'src/common/utils/handlerError.utils';

@Injectable()
export class ExampleService {

  private readonly logger = new Logger('ExampleService');

  constructor(
    @InjectRepository(ExampleEntity)
    private readonly exampleRepository: Repository<ExampleEntity>,
  ) { }

  public async create(createEstadioDto: CreateExampleDto): Promise<ExampleEntity> {
    try {
      return null;
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async findAll(queryDto: QueryDto): Promise<ExampleEntity[]> {
    try {
      return null;
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async findOne(id: string): Promise<ExampleEntity> {
    try {
      return null;
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async update(id: string, updateExampleDto: UpdateExampleDto): Promise<ExampleEntity> {
    try {
      return null;
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async remove(id: string): Promise<DeleteMessage> {
    try {
      return {
        message: 'Example deleted successfully',
        deleted: true,
      };
    } catch (error) {
      handlerError(error, this.logger);
    }
  }
}
