import * as amqp from"amqplib"
import { v2 as cloudinary } from "cloudinary"
import { AppDataSource } from "../data-source"
import { Thread } from "../entities/Thread"
import 'dotenv/config'

class ThreadWorker {
    async create(queueName: string, connection: amqp.Connection) {
        try {
            const channel = await connection.createChannel()

            await channel.assertQueue(queueName)
            await channel.consume(queueName, async (message) => {
                if (!message !== null) {
                    try {
                        const payload = JSON.parse(message.content.toString())

                        console.log("message diterima : ", payload)

                        console.log("env var : ",process.env.CLOUD_NAME);
                        
                            // cloudinary.config({
                            //     cloud_name: "dvjeeregs",
                            //     api_key: "824371712787679",
                            //     api_secret: "emhxriNR_S_4mTF64aK1kCFClik"
                            // })
                        

                        const cloudinaryResponse = await cloudinary.uploader.upload(
                            "./uploads/" + payload.image
                        )

                        const thread = AppDataSource.getRepository(Thread).create({
                            content: payload.content ? payload.content: "",
                            image: cloudinaryResponse.secure_url ? cloudinaryResponse.secure_url: "",
                            user: {id: payload.user_id}
                        })

                        await AppDataSource.getRepository(Thread).save(thread)

                        console.log("create thread success")
                        channel.ack(message)
                    } catch (error) {
                        console.log("queue is failed!", error)
                    }
                }
            })
        } catch (error) {
            console.log("Error processing queue: ", error)
        }
    }
}

export default new ThreadWorker()