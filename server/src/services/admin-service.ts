import { ICookieOptions, ILoginTokenPayload, IAdmin, uuid } from "../interface/interfaces";
import { UnauthorizedError } from "../utils/err";
import AdminRepository from "../repositories/admin-repository";

export default class AdminService{
    static async authenticateAdmin(token: string): Promise<IAdmin>{
        const registeredAdmin: IAdmin | null =  await AdminRepository.findAdminByToken(token);
        if(!registeredAdmin){
            throw new UnauthorizedError('Admin Service');
        }

        return registeredAdmin
    }
}