import { ResponseMessage } from "../interfaces/responseMessage.interface";

export const responseHandler = (responseOptions: ResponseMessage): ResponseMessage => {
    const { message, error, statusCode = 500, data } = responseOptions;
    const response: ResponseMessage = {
        message,
        error,
        statusCode,
        data,
    };
    return response;
};













