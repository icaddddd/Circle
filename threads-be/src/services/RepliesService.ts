import { Request, Response } from "express";
import { Repository } from "typeorm";
import { Reply } from "../entities/Reply";
import { AppDataSource } from "../data-source";

class RepliesService {
    private readonly replyRepository: Repository<Reply> = AppDataSource.getRepository(Reply)

    async find (reqQuery: any): Promise<any> {
        try {
            const threadId = parseInt(reqQuery.thread_id ?? 0)

            const replies = await this.replyRepository.find({
                relations: ["user"],
                where: {
                    thread: {
                        id: threadId
                    }
                },
                order: {
                    id: "DESC"
                }
            })

            return replies
        } catch (error) {
            throw new Error("something went error on the server")
        }
    }

    async create (reqBody: any, loginSession: any): Promise<any> {
        try {
            const reply = this.replyRepository.create({
                content: reqBody.content,
                user: {
                  id: loginSession.user.id,
                },
                thread: {
                  id: reqBody.thread_id,
                },
              });

              await this.replyRepository.save(reply)

              return
        } catch (error) {
            throw new Error("something went error on the server")
        }
    }
}

export default new RepliesService()