import { Request, Response } from "express";
import AdminService from '../services/admin-service';
import { IAPIResponse, ICookieOptions, IAdmin } from "../interface/interfaces";
import createResponse from '../utils/response';
import { UnauthorizedError } from "../utils/err";

export default class AdminController{
    static async handleLoginRequest(req: Request, res: Response): Promise<void>{
        try {
            const token = req.headers['authorizationtoken']
            const authenticateAdmin = await AdminService.authenticateAdmin(token as string);

            const response = createResponse(true, authenticateAdmin, null);
            res.status(200).json(response);
        } catch (err: any) {
            const response: IAPIResponse<null> = createResponse(false, null, 'Internal server error');
            if(err instanceof UnauthorizedError){
                console.log('Controller Error', err);
                response.error = err.message;
                res.status(err.code).json(response);
            }else if(err instanceof UnauthorizedError){
                response.error = err.message;
                res.status(err.code).json(response);
            }else{
                res.status(500).json(response);
            }
        }
    }
}