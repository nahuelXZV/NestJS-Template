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
    public async login(@Body() { username, password }: AuthDTO) {
        const user = await this.authService.validateUser(username, password);
        if (user) {
            return this.authService.generateJWT(user);
        }
        throw new UnauthorizedException('Invalid credentials');
    }

    // recover password
    // @Post('recover')
    // public async recover(@Body() { username }) {
        // return await this.authService.recoverPassword(username);
    // }

}
