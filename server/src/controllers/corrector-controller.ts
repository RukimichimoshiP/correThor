import { Request, Response } from "express";
import CorrectorService from "../services/corrector-service";
import { IAPIResponse, ICorrector } from "../interface/interfaces";
import createResponse from '../utils/response';
import { ConflictError, NotFoundError, UnauthorizedError } from "../utils/err";

export default class CorrectorController{
    static async getAllCorrectors(req: Request, res: Response): Promise<void>{
        try {
            const correctors = await CorrectorService.getAllCorrectors();

            const response = createResponse(true, correctors, null);
            res.status(200).json(response);
        } catch (err: any) {
            const response: IAPIResponse<null> = createResponse(false, null, 'Internal server Error');

            res.status(500).json(response);
        }
    }

    static async createNewCorrector(req: Request, res: Response): Promise<void>{
        try {
            const corrector = await CorrectorService.createNewCorrector(req.body.name);

            const response = createResponse(true, corrector, null);
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

    static async updateCorrector(req: Request, res: Response): Promise<void>{
        try {
            const correctorID = req.params.id;
            const correctorName = req.body.name;

            const correctorInfo: ICorrector = {name: correctorName, id: correctorID};

            const updatedCorrector = await CorrectorService.updateCorrector(correctorInfo);
            const response = createResponse(true, updatedCorrector, null);
            res.status(200).json(response);
        } catch (err: any) {
            const response: IAPIResponse<null> = createResponse(false, null, 'Internal server error.');

            if(err instanceof ConflictError || err instanceof NotFoundError){
                response.error = err.message;
                res.status(err.code).json(response);
            }else{
                res.status(500).json(response);
            }
        }
    }

    static async deleteCorrector(req: Request, res: Response): Promise<void>{
        try {
            const correctorID = req.params.id;

            const deletedCorrector = await CorrectorService.deleteCorrector(correctorID);
            const response = createResponse(true, deletedCorrector, null);
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
}