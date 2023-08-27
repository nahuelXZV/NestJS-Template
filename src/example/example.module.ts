import { Module } from '@nestjs/common';
import { ExampleService } from './services/example.service';
import { ExampleController } from './controllers/example.controller';

@Module({
  controllers: [ExampleController],
  providers: [ExampleService]
})
export class ExampleModule { }
