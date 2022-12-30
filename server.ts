import express, { ErrorRequestHandler, Express, NextFunction, Request, Response } from 'express';
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import 'reflect-metadata';
import AppDataSource from './AppDataSource';
import path from 'path';
import fs from 'fs';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors, { CorsOptions } from 'cors';
import https from "https";

const host = process.env.WEB_HOST || 'http://localhost';
const port = process.env.WEB_PORT || 3000;

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
app.use(helmet())

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 10,
    message: (req: Request, res: Response) => {
        res.json({
            message: 'Sorğu limitini keçmisiz, birazdan yoxlayın'
        })
    }
})

app.use(limiter);
app.set('trust proxy', 1);

const whitelist = ['http://localhost:1303', 'http://api.twelfy.az:1303']
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin && whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))

app.use(bodyParser.json({ 
    limit: '1mb',
}));
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
  
// custom error handler
app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    res.status(500).send('Sistem xətası baş verdi!')
})

// custom 404
// app.use((req, res, next) => {
//     res.status(404).json({
//         message: "Sorry can't find that!"
//     })
// })

const options = {
    key: fs.readFileSync(`${process.env.CERTDIR}/${process.env.CERTDOMAIN}/privkey.pem`),
    cert: fs.readFileSync(`${process.env.CERTDIR}/${process.env.CERTDOMAIN}/fullchain.pem`)
};

process.on('uncaughtException', function (err) {
    console.log(err);
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at ${host}:${port}`);
});

https.createServer(options, app).listen(443)