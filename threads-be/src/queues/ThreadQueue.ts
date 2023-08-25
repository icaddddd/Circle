import { Request, Response } from "express";
import { createThreadsSchema } from "../utils/validatros/thread";
import { sendMessageToQueue } from "../libs/rabbitmq";

class ThreadQueue{
    async create(req: Request, res: Response) {
        try {
            const queueName = "threads-queue"
            const filename = res.locals.filename

            const data = {
                content: req.body.content,
                image: filename
            }

            const {error} = createThreadsSchema.validate(data)

            if (error) {
                return res.status(500).json({error: error})
            }

            const loginSession = res.locals.loginSession

            const payload = {
                content: data.content,
                image: data.image,
                user_id: loginSession.user.id
            }

            const errorQueue = await sendMessageToQueue(queueName, payload)

            if (errorQueue) {
                return res.status(500).json({error: errorQueue})
            }

            res.status(200).json({
                message: "thread is queued",
                data: payload
            })
        } catch (error) {
            console.log("Queue error", error)
            return res.status(500).json({error: "something wrong in server!"})
        }
    }
}

export default new ThreadQueue()    