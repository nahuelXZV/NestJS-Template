export interface ResponseMessage {
    statusCode: number;
    message?: string | string[]; 
    error?: string;
    data?: any;
}