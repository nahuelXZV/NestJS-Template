import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

export const GetUser = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();
        const user = req.idUser;
        if (!user)
            throw new InternalServerErrorException('User not found (request)');
        return (!data)
            ? user
            : user[data];
    }
);