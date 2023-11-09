import "reflect-metadata";
import { DataSource } from "typeorm";
// import { User } from "./entities/User";
// import { Thread } from "./entities/Thread";
// import { Reply } from "./entities/Reply";
// import { Likes } from "./entities/Likes";
// import { Follow } from "./entities/Follow";

// export const AppDataSource = new DataSource({
//     type: "postgres",
//     host: "localhost",
//     port: 5432,
//     username: "postgres",
//     password: "sjfrhsjd",
//     database: "db_threads_be",
//     synchronize: true,
//     logging: false,
//     entities: ["src/entities/*.ts"],
//     migrations: ["src/migrations/*.ts"],
//     subscribers: [],
// })
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "monorail.proxy.rlwy.net",
  port: 22924,
  username: "postgres",
  password: "eAec2BgbfF4A64AE5D*eGb*daGf4F3dF",
  database: "railway",
  synchronize: true,
  logging: false,
  entities: ["src/entities/*.ts"],
  // entities: [User, Thread, Reply, Likes, Follow],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});
