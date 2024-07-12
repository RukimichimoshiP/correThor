import { Request, response, Response } from "express";
import CorrectionService from "../services/correction-service";
import { IAPIResponse, ICorrection } from "../interface/interfaces";
import createResponse from '../utils/response';
import { ConflictError, NotFoundError } from "../utils/err";

export default class CorrectionController{
    static async getCorrectionByCorrectorId(req: Request, res: Response): Promise<void>{
        try {
            const corrections = await CorrectionService.getCorrectionByCorrectorId(req.params.id);

            const response = createResponse(true, corrections, null);
            res.status(200).json(response);
        } catch (err: any) {
            const response: IAPIResponse<null> = createResponse(false, null, 'Internal server error.');

            if(err instanceof NotFoundError){
                response.error = err.message;
                res.status(err.code).json(response);
            }else{
                res.status(500).json(response);
            }
        }
    }

    static async createNewCorrection(req: Request, res: Response): Promise<void>{
        try {
            const correction = await CorrectionService.createNewCorrection(req.body);

            const response = createResponse(true, correction, null);
            res.status(201).json(response);
        } catch (err: any) {
            const response: IAPIResponse<null> = createResponse(false, null, 'Internal server error.');

            if(err instanceof ConflictError){
                response.error = err.message;
                res.status(err.code).json(response);
            }else{
                res.status(500).json(response);
            }
        }
    }

    static async deleteCorrection(req: Request, res: Response): Promise<void>{
        try {
            const correction = await CorrectionService.deleteCorrection(req.params.id);

            const response = createResponse(true, correction, null);
            res.status(200).json(response);
        } catch (err: any) {
            const response: IAPIResponse<null> = createResponse(false, null, 'Internal server error');

            if(err instanceof NotFoundError){
                response.error = err.message;
                res.status(err.code).json(response);
            }else{
                res.status(500).json(response)
            }
        }
    }

    static async updateCorrection(req: Request, res: Response): Promise<void>{
        try {
            if(req.body.id){
                throw new ConflictError('Controller Layer', 'It is not possible to modify the correction corrector');
            }

            const correction = await CorrectionService.updateCorrection(req.body, req.params.id);

            const response = createResponse(true, correction, null);
            res.status(200).json(response);
        } catch (err: any) {
            console.log('Error in updateCorrection:', err);
            const response: IAPIResponse<null> = createResponse(false, null, 'Internal server error.');

            if(err instanceof NotFoundError || err instanceof ConflictError){
                response.error = err.message;
                res.status(err.code).json(response);
            }else{
                res.status(500).json(response);
            }
        }
    }
}