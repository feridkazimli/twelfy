"use strict";
// import express, { Request, Response, Express, NextFunction } from 'express';
// import bodyParser from "body-parser";
// import dotenv from 'dotenv';
// import 'reflect-metadata';
// import AppDataSource from './AppDataSource';
// import SecureController from './src/services/SecureController';
// import users from './src/routes/users';
// dotenv.config();
// // establish database connection
// AppDataSource.initialize()
// .then(() => {
//     console.log("⚡️ Data Source has been initialized!")
// })
// .catch((err) => {
//     console.error("💣 Error during Data Source initialization", err)
// })
// const app: Express = express();
// const host = process.env.WEB_HOST || 'http://localhost';
// const port = process.env.WEB_PORT || 3000;
// app.use(bodyParser.json());
// app.use(
//     bodyParser.urlencoded({
//         extended: true
//     })
// );
// // user controller
// app.use(users);
// app.listen(port, () => {
//     console.log(`⚡️[server]: Server is running at ${host}:${port}`);
// });
