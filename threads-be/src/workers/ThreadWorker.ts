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
                        

                        const cloudinaryResponse = await cloudinary.uploader.upload(
                            "./uploads/" + payload.image
                        )

                        const thread = AppDataSource.getRepository(Thread).create({
                            content: payload.content,
                            image: cloudinaryResponse.secure_url,
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