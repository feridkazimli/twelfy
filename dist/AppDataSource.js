"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = require("path");
dotenv_1.default.config();
const AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.HOST,
    // port: 3306,
    username: process.env.USERDB,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [(0, path_1.join)(__dirname, 'src/modules/**/entity/*.ts')],
    migrations: [(0, path_1.join)(__dirname, 'src/migration/*.ts')],
    migrationsTableName: "migrations_table",
    logging: true,
    synchronize: false,
});
exports.default = AppDataSource;
