import { DatabaseService } from "../database/db-connection";
import { IAdmin, uuid } from "../interface/interfaces";

const db = new DatabaseService;
export default class AdminRepository{
    static async findAdminByToken(token: string): Promise<IAdmin | null>{
        const query = 'SELECT * FROM admin WHERE token = $1';
        const { rows } = await db.query(query, [token]);

        return rows[0] || null;
    }
}