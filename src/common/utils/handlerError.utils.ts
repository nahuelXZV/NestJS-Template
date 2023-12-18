import { BadRequestException, InternalServerErrorException, Logger } from '@nestjs/common';

export const handlerError = (error: any, logger: Logger): any => {
  logger.error(error);
  if (error.code === '23505') throw new BadRequestException(error.detail);
  if (error.code === '22P02') throw new BadRequestException('El id no es válido.');
  if (error.code === '23503') throw new BadRequestException('El id no existe.');
  if (error.code === '23502') throw new BadRequestException('Faltan campos obligatorios.');
  if (error.code === '22001') throw new BadRequestException('El campo es demasiado largo.');
  if (error.code === '22003') throw new BadRequestException('El campo es demasiado corto.');
  if (error.code === '22007') throw new BadRequestException('El campo no es una fecha.');
  throw new InternalServerErrorException(error);
};
