import express, { Express, NextFunction, Request, Response } from 'express';
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import 'reflect-metadata';
import AppDataSource from './AppDataSource';
import path from 'path';
import fs from 'fs';

dotenv.config();
// establish database connection
AppDataSource.initialize()
    .then(() => {
        console.log("⚡️ Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("💣 Error during Data Source initialization", err)
    })

const app: Express = express();
const host = process.env.WEB_HOST || 'http://localhost';
const port = process.env.WEB_PORT || 3000;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.get('/test', (req: Request, res: Response, next: NextFunction) => {
    res.json({test: 'test'})
})

let module_dirname = path.join(__dirname, 'src/modules');
fs.readdirSync(module_dirname).forEach(function (module) {
    if (fs.lstatSync(path.join(module_dirname, module)).isDirectory()) {
        if (fs.existsSync(path.join(module_dirname, module, 'routes', process.env.ROUTE_PATH || 'app.ts'))) {
            import(path.join(module_dirname, module, 'routes', process.env.ROUTE_PATH || 'app.ts'))
                .then(route => app.use('/' + module, route.default));
        }
    }
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at ${host}:${port}`);
});