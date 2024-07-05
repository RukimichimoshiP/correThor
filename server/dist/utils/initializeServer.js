"use strict";
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
exports.InitializeServer = exports.dbMessage = exports.serverMessage = exports.amb = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const chalk_1 = __importDefault(require("chalk"));
const db_connection_1 = require("../database/db-connection");
dotenv_1.default.config();
exports.amb = process.env.AMB = '1' ? chalk_1.default.yellow.bold('PROD') : chalk_1.default.blueBright.bold('DEV');
exports.serverMessage = chalk_1.default.green.bold('SERVER');
exports.dbMessage = chalk_1.default.green.bold('DB');
const InitializeServer = (app) => __awaiter(void 0, void 0, void 0, function* () {
    const address = app.address();
    let host;
    let port;
    const db = new db_connection_1.DatabaseService;
    if (typeof address === 'string') {
        // Para Unix socket
        console.info(`[${exports.amb}][${exports.serverMessage}] Server is listening at ${address} - ${chalk_1.default.gray(new Date())}`);
    }
    else if (address && typeof address === 'object') {
        host = address.address = '::' ? 'localhost' : address.address;
        port = address.port;
        console.info(`[${exports.amb}][${exports.serverMessage}] Server is listening at ${chalk_1.default.blue(`http://${host}:${port}`)} - ${chalk_1.default.gray(new Date())}`);
    }
    else {
        console.info(`[${exports.amb}][${exports.serverMessage}] Unable to determine the server address. - ${chalk_1.default.gray(new Date())}`);
    }
    const testConnectionDB = yield db.query('SELECT * FROM users', []);
    if (testConnectionDB) {
        console.info(`[${exports.amb}][${exports.dbMessage}] Database connected - ${chalk_1.default.gray(new Date())}`);
    }
});
exports.InitializeServer = InitializeServer;
