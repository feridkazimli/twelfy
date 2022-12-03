import { DataSource } from "typeorm";
import dotenv from 'dotenv';
import { join } from "path";
dotenv.config();

const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.HOST,
    // port: 3306,
    username: process.env.USERDB,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [join(__dirname, 'src/modules/**/entity/*{.ts, .js}')],
    migrations: [join(__dirname, 'src/migration/*{.ts, .js}')],
    migrationsTableName: "migrations_table",
    logging: true,
    synchronize: false,
});

export default AppDataSource;