import { NextFunction, Request, Response } from "express";
import { RequestBodyValidator } from "../utils/validation";
import { validationFunction, IAPIResponse, uuid } from "../interface/interfaces";
import ValidationMiddleware from ".";
import { UnauthorizedError, UnauthorizedSessionError } from "../utils/err";
import createResponse from "../utils/response";
import { verifyToken } from "../utils/token";

export default class LoginMiddleware{
    static async validateBodyToLogin(req: Request, res: Response, next: NextFunction): Promise<void>{
        const requestBodyValidator = new RequestBodyValidator();

        const validationFunctions: Array<validationFunction> = [
            () => requestBodyValidator.validateAdminToken(req.body.token)
        ];

        await ValidationMiddleware.validateRequest(req, res, next, validationFunctions);
    }

    static async authorization(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
            const authHeader = req.headers['authorizationtoken'];
        
            if(authHeader === null){
                throw new UnauthorizedSessionError('Middleware layer(login)');
            }

            const verify = await verifyToken(authHeader as string);
            if(!verify){
                throw new UnauthorizedSessionError('Middleware layer(login)');
            }

            next();
        } catch (err: any) {
            const response: IAPIResponse<null> = createResponse(false, null, 'Internal server error.');

            if(err instanceof UnauthorizedError){
                response.error = err.errorMessage;
                res.status(err.code).json(response);
            }else{
                res.status(500).json(response);
            }
        }
    }
}