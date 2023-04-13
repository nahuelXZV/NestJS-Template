import { Body, Controller, Post } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { AuthDTO } from '../dto/auth.dto';
import { AuthI } from '../interfaces/auth.interface';
import { AuthService } from '../services/auth.service';

@ApiTags('Auth')
@Controller()
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('login')
    public async login(@Body() { email, password }: AuthDTO) {
        return this.authService.validateUser(email, password);
    }

    // recover password
    // @Post('recover')
    // public async recover(@Body() { username }) {
        // return await this.authService.recoverPassword(username);
    // }

}
