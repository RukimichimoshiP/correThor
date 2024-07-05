"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const sql = __importStar(require("pg"));
const config_1 = __importDefault(require("../config/config"));
const initializeServer_1 = require("../utils/initializeServer");
class DatabaseService {
    constructor() {
        this.USER = config_1.default.DB_USER || '';
        this.PASSWORD = config_1.default.DB_PASSWORD || '';
        this.SERVER = config_1.default.DB_HOST || '';
        this.DATABASE = config_1.default.DB_DATABASE_NAME;
        this.PORT = config_1.default.DB_PORT || 5432;
        this.pool = new sql.Pool({
            user: this.USER,
            password: this.PASSWORD,
            host: this.SERVER,
            database: this.DATABASE,
            port: this.PORT
        });
    }
    query(query, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            try {
                const result = yield this.pool.connect();
                return result;
            }
            catch (error) {
                console.error(`[${initializeServer_1.amb}][${initializeServer_1.dbMessage}] Error connecting to database ${error}`);
                throw error;
            }
            finally {
                client.release();
            }
        });
    }
}
exports.DatabaseService = DatabaseService;
