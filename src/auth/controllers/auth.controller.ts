import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger/dist/decorators';

import { AuthDTO } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../../users/dto';
import { ResponseMessage } from 'src/common/interfaces/responseMessage.interface';

@ApiTags('Auth')
@Controller()
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post('register')
  public async register(@Body() createUserDto: CreateUserDto): Promise<ResponseMessage> {
    return {
      statusCode: 201,
      data: await this.authService.register(createUserDto),
    };
  }

  @Post('login')
  public async login(@Body() authDto: AuthDTO): Promise<ResponseMessage> {
    const { email, password } = authDto;
    return {
      statusCode: 200,
      data: await this.authService.login(email, password),
    };
  }

  @ApiQuery({ name: 'token', type: 'string', required: true })
  @Get('checkToken')
  public async checkToken(@Query('token') token: string): Promise<ResponseMessage> {
    return {
      statusCode: 200,
      data: await this.authService.checkToken(token)
    };
  }

  // recover password
  // @Post('recover')
  // public async recover(@Body() { username }) {
  // return await this.authService.recoverPassword(username);
  // }
}
