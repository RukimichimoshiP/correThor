import { ICorrection, uuid } from "../interface/interfaces";
import { NotFoundError } from "../utils/err";
import CorrectorRepository from "../repositories/corrector-repository";
import CorrectionRepository from "../repositories/correction-repository";

export default class CorrectionService{
    static async getCorrectionByCorrectorId(correctorId: uuid): Promise<Array<ICorrection | null>>{

        const correctorExist = await CorrectorRepository.getCorrectorById(correctorId);
        if(!correctorExist){
            throw new NotFoundError('Correction Service', 'Corrector');
        }

        const corrections =  await CorrectionRepository.getCorrectionByCorrectorId(correctorId);

        return corrections
    }

    static async createNewCorrection(correctionInfos: Partial<ICorrection>): Promise<ICorrection>{
        const correctorExist = CorrectorRepository.getCorrectorById(correctionInfos.correctorid as uuid);
        if(!correctorExist){
            throw new NotFoundError('Correction Service', 'Corrector');
        }

        const correctionData: Partial<ICorrection> = {
            correctorid: correctionInfos.correctorid,
            class: correctionInfos.class,
            module: correctionInfos.module,
            meeting: correctionInfos.meeting,
            student: correctionInfos.student
        }

        const newCorrection = await CorrectionRepository.insertNewCorrection(correctionData);
        return newCorrection;
    }

    static async deleteCorrection(correctionID: uuid): Promise<ICorrection>{
        const correctionExist = await CorrectionRepository.getCorrectionById(correctionID);
        console.log(correctionExist);
        if(!correctionExist){
            throw new NotFoundError('Service Layer', 'Correction');
        }

        const deletedCorrection = await CorrectionRepository.deleteCorrection(correctionID);
        return deletedCorrection;
    }

    static async updateCorrection(correctionInfos: Partial<ICorrection>, correctionID: uuid): Promise<ICorrection>{
        const correctionExist = await CorrectionRepository.getCorrectionById(correctionID);
        if(!correctionExist){
            throw new NotFoundError('Service Layer', 'Correction');
        }

        const updatedCorrection: ICorrection = {
            ...correctionExist,
            ...correctionInfos
        }

        const updatedCorrectionData = await CorrectionRepository.updateCorrection(updatedCorrection);
        return updatedCorrectionData;
    }
}