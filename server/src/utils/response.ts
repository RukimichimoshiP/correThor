import { IAPIResponse } from "../interface/interfaces";

const createResponse = <T>(success:boolean, data:T, error:string | null): IAPIResponse<T> => ({
    success,
    data,
    error
});

export default createResponse;