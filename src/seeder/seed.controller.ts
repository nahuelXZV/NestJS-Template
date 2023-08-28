import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Seeder')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) { }

  @Get()
  public async runSeeder(): Promise<any> {
    return await this.seedService.runSeeders();
  }
}
