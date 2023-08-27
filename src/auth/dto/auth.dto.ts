import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { AuthI } from '../interfaces/auth.interface';

export class AuthDTO implements AuthI {
  @ApiProperty({
    example: 'johnDoe@live.com',
    type: String,
    description: 'Correo electrónico',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    type: String,
    description: 'Contraseña del usuario',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
