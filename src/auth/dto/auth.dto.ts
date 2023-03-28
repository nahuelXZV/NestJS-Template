import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";
import { AuthI } from "../interfaces/auth.interface";

export class AuthDTO implements AuthI {
    @ApiProperty({
        example: 'johnDoe || johnDoe@live.com',
        type: String,
        description: 'Nombre de usuario o correo electrónico'
    })
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        example: '123456',
        type: String,
        description: 'Contraseña del usuario'
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}