import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { AuthDTO } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() { email, password }: AuthDTO) {
    return this.authService.validateUser(email, password);
  }

  @Post('checkToken')
  public async checkToken(@Body() token: { token: string }) {
    return this.authService.checkToken(token.token);
  }

  // recover password
  // @Post('recover')
  // public async recover(@Body() { username }) {
  // return await this.authService.recoverPassword(username);
  // }
}
