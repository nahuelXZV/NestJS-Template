import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SeedService } from './seed.service';

@ApiTags('Seeder')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) { }

  @Get()
  public async runSeeder(): Promise<any> {
    return await this.seedService.runSeeders();
  }
}
