import { DatabaseService } from "../database/db-connection";
import { ICorrector, uuid, typeName } from "../interface/interfaces";

const db = new DatabaseService;
export default class CorrectorRepository{
    static async getAllCorrectors(): Promise<Array<ICorrector | null>>{
        const query = 'SELECT * FROM corrector';
        const { rows } = await db.query(query, []);

        return rows;
    }

    static async insertNewCorrector(correctorName: typeName): Promise<ICorrector | void>{
        const query = 'INSERT INTO corrector (name) VALUES ($1) RETURNING *';
        const { rows } = await db.query(query, [correctorName]);

        return rows[0];
    }

    static async updateCorrector(correctorInfo: ICorrector): Promise<ICorrector>{
        const query = 'UPDATE corrector SET name = $1 WHERE id = $2 RETURNING *';
        const { rows } = await db.query(query, [correctorInfo.name, correctorInfo.id]);

        return rows[0];
    }

    static async deleteCorrector(correctorID: uuid): Promise<ICorrector>{
        try{
            await db.query('BEGIN', []);

            // Deletar correções relacionadas
            const queryCorrections = 'DELETE FROM correction WHERE correctorid = $1';
            await db.query(queryCorrections, [correctorID]);

            // Deletar corretor
            const queryCorrector = 'DELETE FROM corrector WHERE id = $1 RETURNING *';
            const { rows } = await db.query(queryCorrector, [correctorID]);

            await db.query('COMMIT', []);

            return rows[0];
        }catch(err){
            await db.query('ROLLBACK', []);
            console.error('Error in deleteCorrector transaction', err);
            throw err;
        }
    }

    static async getCorrectorById(correctorID: uuid): Promise<ICorrector | null>{
        const query = 'SELECT * FROM corrector WHERE id = $1'
        const { rows } = await db.query(query, [correctorID]);

        return rows[0];
    }

    static async getCorrectorByName(name: string): Promise<ICorrector | null>{
        const query = 'SELECT * FROM corrector WHERE name = $1';
        const { rows } = await db.query(query, [name]);

        return rows[0] || null;
    }
}