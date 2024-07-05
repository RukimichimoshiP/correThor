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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config/config"));
const initializeServer_1 = require("./utils/initializeServer");
const PORT = config_1.default.PORT || 5000;
const server = (0, express_1.default)();
console.clear();
server.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true
}));
server.use(express_1.default.json());
const app = server.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    (0, initializeServer_1.InitializeServer)(app);
}));
