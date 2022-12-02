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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
require("reflect-metadata");
const AppDataSource_1 = __importDefault(require("./AppDataSource"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
// establish database connection
AppDataSource_1.default.initialize()
    .then(() => {
    console.log("⚡️ Data Source has been initialized!");
})
    .catch((err) => {
    console.error("💣 Error during Data Source initialization", err);
});
const app = (0, express_1.default)();
const host = process.env.WEB_HOST || 'http://localhost';
const port = process.env.WEB_PORT || 3000;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
let module_dirname = path_1.default.join(__dirname, 'src/modules');
fs_1.default.readdirSync(module_dirname).forEach(function (module) {
    var _a;
    if (fs_1.default.lstatSync(path_1.default.join(module_dirname, module)).isDirectory()) {
        if (fs_1.default.existsSync(path_1.default.join(module_dirname, module, 'routes', process.env.ROUTE_PATH || 'app.ts'))) {
            (_a = path_1.default.join(module_dirname, module, 'routes', process.env.ROUTE_PATH || 'app.ts'), Promise.resolve().then(() => __importStar(require(_a)))).then(route => app.use('/' + module, route.default));
        }
    }
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at ${host}:${port}`);
});
