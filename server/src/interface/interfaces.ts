export type uuid = string;
export type email = string;
export type typeName = 'name'
export type validationFunction = () => IValidationResponse;

// entities interfaces
export interface IAdmin{
    id: uuid;
    name: string;
    token: string;
}

export interface ICorrection{
    id: uuid;
    correctorid: uuid;
    class: string;
    module: string;
    meeting: string;
    student: string;
}

export interface corrector{
    id: uuid;
    name: string;
}

// response interfaces
export interface IValidationResponse{
    isValid: boolean;
    message: string | null;
}

export interface IAPIResponse<T>{
    success: boolean;
    data: T | null;
    error: null | string;
    messages?: Array<string> | string;
}

export interface ILoginTokenPayload{
    userID: uuid;
}

declare module 'express-serve-static-core'{
    interface Request {
        user?: ILoginTokenPayload;
    }
}