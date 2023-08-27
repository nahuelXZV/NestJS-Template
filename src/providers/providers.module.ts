import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { Global } from '@nestjs/common/decorators/modules/global.decorator';
import { HttpCustomService } from './http/http.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [HttpCustomService],
  exports: [HttpCustomService, HttpModule],
})
export class ProvidersModule {}
