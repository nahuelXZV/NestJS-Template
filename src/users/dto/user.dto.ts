import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ROLES } from "src/constants";

export class UserDTO {

    @ApiProperty({
        example: 'John Doe',
        type: String,
        description: 'Nombre completo del usuario'
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        example: 'john@live.com',
        type: String,
        description: 'Correo electrónico del usuario'
    })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'johnDoe',
        type: String,
        description: 'Nombre de usuario'
    })
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({
        example: '123456',
        type: String,
        description: 'Contraseña del usuario'
    })
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({
        example: 'ADMIN',
        enum: ROLES,
        description: 'Rol del usuario'
    })
    @IsNotEmpty()
    @IsEnum(ROLES)
    role: ROLES;
}

export class UserUpdateDTO {

    @ApiProperty({
        example: 'John Doe',
        type: String,
        description: 'Nombre completo del usuario',
        required: false
    })
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty({
        example: 'john@live.com',
        type: String,
        description: 'Correo electrónico del usuario',
        required: false
    })
    @IsOptional()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'johnDoe',
        type: String,
        description: 'Nombre de usuario',
        required: false
    })
    @IsOptional()
    @IsString()
    username: string;

    @ApiProperty({
        example: '123456',
        type: String,
        description: 'Contraseña del usuario',
        required: false
    })
    @IsOptional()
    @IsString()
    password: string;

    @ApiProperty({
        example: 'ADMIN',
        enum: ROLES,
        description: 'Rol del usuario',
        required: false
    })
    @IsOptional()
    @IsEnum(ROLES)
    role: ROLES;
}