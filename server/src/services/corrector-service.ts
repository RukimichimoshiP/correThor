import { ICorrector, typeName, uuid } from "../interface/interfaces";
import { ConflictError, NotFoundError } from "../utils/err";
import CorrectorRepository from "../repositories/corrector-repository";

export default class CorrectorService{
    static async getAllCorrectors(): Promise<Array<ICorrector | null>>{
        const correctors =  await CorrectorRepository.getAllCorrectors();

        return correctors
    }

    static async createNewCorrector(correctorName: typeName): Promise<ICorrector>{
        const nameUsed = await CorrectorRepository.getCorrectorByName(correctorName);
        if(nameUsed){
            throw new ConflictError('Service layer', 'Name already userd');
        }

        const corrector = await CorrectorRepository.insertNewCorrector(correctorName);
        return corrector as ICorrector;
    }

    static async updateCorrector(correctorInfo: ICorrector): Promise<ICorrector>{
        const corrector: ICorrector = {name: correctorInfo.name, id: correctorInfo.id};

        const correctorIdExist = await CorrectorRepository.getCorrectorById(corrector.id);
        if(!correctorIdExist){
            throw new NotFoundError('Service layer', 'Corrector');
        }

        const correctorNameExist = await CorrectorRepository.getCorrectorByName(corrector.name);
        if(correctorNameExist){
            throw new ConflictError('Service layer', 'Corrector Name already used.');
        }

        const updatedCorrectorData = await CorrectorRepository.updateCorrector(correctorInfo);
        return updatedCorrectorData;
    }

    static async deleteCorrector(correctorID: uuid): Promise<ICorrector>{
        const correctorIdExist = await CorrectorRepository.getCorrectorById(correctorID);
        if(!correctorIdExist){
            throw new NotFoundError('Service layer', 'Corrector');
        }

        const correctorDelete = await CorrectorRepository.deleteCorrector(correctorID);
        return correctorDelete;
    }
}