import { NextFunction, Request, Response } from "express";
import { RequestBodyValidator } from "../utils/validation";
import { ICorrection, validationFunction } from "../interface/interfaces";
import ValidationMiddleware from ".";

export default class CorrectionMiddleware{
    static async validateParamsToGetCorrection(req: Request, res: Response, next: NextFunction): Promise<void>{
        const requestParamsValidator = new RequestBodyValidator();

        const validationFunctions: Array<validationFunction> = [
            () => requestParamsValidator.validateUUID(req.params.id, 'Corrector')
        ];

        await ValidationMiddleware.validateRequest(req, res, next, validationFunctions);
    }

    static async validateRequestBodyCorrection(req: Request, res: Response, next: NextFunction): Promise<void>{
        const correctionInfos: ICorrection = req.body;
        const validator = new RequestBodyValidator();
        const validationFunctions: Array<validationFunction> = [];

        const correctorIDValidation = req.method === 'POST' || req.method === 'PATCH' && correctionInfos.correctorid;
        const classValidation = req.method === 'POST' || req.method === 'PATCH' && correctionInfos.class;
        const moduleValidation = req.method === 'POST' || req.method === 'PATCH' && correctionInfos.module;
        const meetingValidation = req.method === 'POST' || req.method === 'PATCH' && correctionInfos.meeting;
        const studentValidation = req.method === 'POST' || req.method === 'PATCH' && correctionInfos.student;

        correctorIDValidation ? validationFunctions.push(() => validator.validateUUID(correctionInfos.correctorid, 'Corrector')) : null;
        classValidation ? validationFunctions.push(() => validator.validateHaveInformation(correctionInfos.class, 'Class')) : null;
        moduleValidation ? validationFunctions.push(() => validator.validateHaveInformation(correctionInfos.module, 'Module')) : null;
        meetingValidation ? validationFunctions.push(() => validator.validateHaveInformation(correctionInfos.meeting, 'Meeting')) : null;
        studentValidation ? validationFunctions.push(() => validator.validateHaveInformation(correctionInfos.student, 'Student')) : null;

        await ValidationMiddleware.validateRequest(req, res, next, validationFunctions);
    }
}

