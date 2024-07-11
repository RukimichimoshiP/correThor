import { NextFunction, Request, Response } from "express";
import { RequestBodyValidator } from "../utils/validation";
import { ICorrector, validationFunction } from "../interface/interfaces";
import CorrectionMiddleware from "./correction-middleware";
import ValidationMiddleware from ".";

export default class CorrectorMiddleware{
    static async ValidateRequestBodyCorrector(req: Request, res: Response, next: NextFunction): Promise<void>{
        const correctorInfos: ICorrector = req.body;
        const validator = new RequestBodyValidator();
        const validationFunctions: Array<validationFunction> = [];

        const nameValidation = req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH' && correctorInfos.name;

        nameValidation ? validationFunctions.push(() => validator.validateName('name', correctorInfos.name)) : null;

        await ValidationMiddleware.validateRequest(req, res, next, validationFunctions);
    }
}