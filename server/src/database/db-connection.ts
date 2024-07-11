import * as sql from 'pg';
import config from '../config/config';
import { amb, dbMessage } from '../utils/initializeServer';

export class DatabaseService{
    private pool: sql.Pool;
    private USER = config.DB_USER || '';
    private PASSWORD = config.DB_PASSWORD || '';
    private SERVER = config.DB_HOST || '';
    private DATABASE = config.DB_DATABASE_NAME;
    private PORT = config.DB_PORT || 5432;

    constructor(){
        this.pool = new sql.Pool({
            user: this.USER,
            password: this.PASSWORD,
            host: this.SERVER,
            database: this.DATABASE,
            port: this.PORT
        });
    }

    async query(query: string, params: any[]): Promise<any>{
        const client = await this.pool.connect();
        try {
            const result = await client.query(query, params);
            return result;
        } catch (error) {
            console.error(`[${amb}][${dbMessage}] Error connecting to database ${error}`);
            throw error;
        }finally{
            client.release();
        }
    }
}