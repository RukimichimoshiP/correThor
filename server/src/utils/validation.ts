import { IValidationResponse, uuid, typeName } from "../interface/interfaces";
import { validate as uuidValidate } from 'uuid';

export class RequestBodyValidator{
    private validateField(value:string | undefined, pattern:RegExp | null, emptyFieldMessage:string, invalidDataMessage:string): IValidationResponse{
        const response: IValidationResponse = {
            isValid: true,
            message: null
        };

        if(!value){
            response.isValid = false;
            response.message = emptyFieldMessage;
            return response;
        }
        if(typeof value !== 'string'){
            response.isValid = false;
            response.message = 'The data must be of type string.';
        }

        if(pattern){
            if(!pattern.test(value)){
                response.isValid = false;
                response.message = invalidDataMessage;
                return response;
            }
        }

        return response;
    }

    public validateName(typeName: typeName, value: string): IValidationResponse{
        const pattern: RegExp = /^(?=(?:.*[a-zA-Z]){4})[a-zA-Z\s]*$/;
        return this.validateField(
            value,
            pattern,
            `Missing ${typeName} in the request body`,
            `The ${typeName} field must contain only letters and spaces, and must be at least 4 characters long (excluding spaces).`
        );
    }

    public validateHaveInformation(information: string, entityName: string): IValidationResponse{
        const response: IValidationResponse = {
            isValid: true,
            message: null
        };

        if(!information){
            response.isValid = false;
            response.message = `Invalid Data. ${entityName} has not been defined.`;
            return response;
        }

        return response;
    }

    public validateAdminToken(token: string): IValidationResponse{
        const response: IValidationResponse = {
            isValid: true,
            message: null
        };

        if(!token){
            response.isValid = false,
            response.message = `Verification token not added`;
            return response;
        }

        return response;
    }

    public validateUUID(ID: uuid, entityName: string): IValidationResponse{
        const response: IValidationResponse = {
            isValid: true,
            message: null
        };

        if(!ID || !uuidValidate(ID)){
            response.isValid = false;
            response.message = `Invalid ID. ${entityName} ID must be UUID type.`;
            return response;
        }

        return response;
    }
}