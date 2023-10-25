import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "sjfrhsjd",
    database: "db_threads_be",
    synchronize: true,
    logging: false,
    entities: ["src/entities/*.ts"],
    migrations: ["src/migrations/*.ts"],
    subscribers: [],
})
// export const AppDataSource = new DataSource({
//   type: "postgres",
//   host: "containers-us-west-146.railway.app",
//   port: 6512,
//   username: "postgres",
//   password: "MFe37gWz8lm5MMVhmq2B",
//   database: "railway",
//   synchronize: true,
//   logging: false,
//   entities: ["src/entities/*.ts"],
//   migrations: ["src/migrations/*.ts"],
//   subscribers: [],
// });
