import { HttpService } from '@nestjs/axios/dist';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class HttpCustomService {

    constructor(
        private readonly httpService: HttpService
    ) { }

    public async apiGetAll(url: string): Promise<any> {
        try {
            const response = await firstValueFrom(this.httpService.get(url));
            return response.data;
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }


}
