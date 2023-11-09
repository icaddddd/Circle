import { AppDataSource } from "../data-source";
import { cloudinaryConfig } from "../libs/coudinary";
import amqp = require("amqplib");
import ThreadWorker from "./ThreadWorker";

class WorkerHub {
    constructor() {
        AppDataSource.initialize().then(async () => {
            cloudinaryConfig()
            const connection = await amqp.connect("amqp://localhost")

            ThreadWorker.create("threads-queue", connection)
            console.log("jalan");
            
        })
        .catch((error) => console.log(error))
    }
}

export default new WorkerHub()