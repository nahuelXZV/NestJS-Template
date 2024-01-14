import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsPositive, IsString, Min } from 'class-validator';
import { ORDER, ORDER_ENUM } from '../constants';

export class QueryDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number) // enableImplicitConversions: true
  limit?: number;

  @IsOptional()
  @Min(0)
  @Type(() => Number) // enableImplicitConversions: true
  offset?: number;

  @IsOptional()
  @IsEnum(ORDER_ENUM)
  order?: ORDER;

  @IsString()
  @IsOptional()
  attr: string;

  @IsOptional()
  value: string;
}
