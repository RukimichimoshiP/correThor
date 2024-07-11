import AdminService from "../services/admin-service";

export const verifyToken = async (token: string): Promise<boolean> => {
    const admin = await AdminService.authenticateAdmin(token);

    if(admin){
        return true
    }else{
        return false;
    }
}