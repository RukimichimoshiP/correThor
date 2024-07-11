import { DatabaseService } from "../database/db-connection";
import { ICorrection, uuid } from "../interface/interfaces";

const db = new DatabaseService;
export default class CorrectionRepository{
    static async getCorrectionByCorrectorId(correctorID: uuid): Promise<Array<ICorrection | null>>{
        const query = 'SELECT * FROM correction WHERE correctorid = $1';
        const { rows } = await db.query(query, [correctorID]);

        return rows;
    }

    static async insertNewCorrection(correctionInfos: Partial<ICorrection>): Promise<ICorrection>{
        const query = 'INSERT INTO correction (correctorid, class, module, meeting, student) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const { rows } = await db.query(query, [...Object.values(correctionInfos)]);

        return rows[0];
    }

    static async deleteCorrection(correctionID: uuid): Promise<ICorrection>{
        const query = 'DELETE FROM correction WHERE id = $1 RETURNING *';
        const { rows } = await db.query(query, [correctionID]);

        return rows[0];
    }

    static async updateCorrection(correctionInfos: Partial<ICorrection>): Promise<ICorrection>{
        const correction: Partial<ICorrection> = {class: correctionInfos.class, module: correctionInfos.module, meeting: correctionInfos.meeting, student: correctionInfos.student, id: correctionInfos.id};

        const query = 'UPDATE correction SET class = $1, module = $2, meeting = $3, student = $4 WHERE id = $5 RETURNING *';
        const { rows } = await db.query(query, [...Object.values(correction)]);

        return rows[0];
    }

    static async getCorrectionById(correctionID: uuid): Promise<ICorrection | null>{
        const query = 'SELECT * FROM correction WHERE id = $1';
        const { rows } = await db.query(query, [correctionID]);

        return rows[0];
    }
}