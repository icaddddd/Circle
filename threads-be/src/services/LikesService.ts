import { Repository } from "typeorm";
import { Likes } from "../entities/Likes";
import { AppDataSource } from "../data-source";

class LikesService {
    private readonly likeRepository: Repository<Likes> = AppDataSource.getRepository(Likes)

    async create (reqBody: any, loginSession: any): Promise<any> {
        try {
            const isLikeExist = await this.likeRepository.count({
                where: {
                    user: {
                        id: loginSession.user.id
                    },
                    thread: {
                        id: reqBody.thread_id
                    }
                }
            })
            
            if (isLikeExist > 0) {
                throw new Error ('you liked this thread!')
            }

            const like = this.likeRepository.create({
                thread: {
                    id: reqBody.thread_id
                },
                user: {
                    id: loginSession.user.id
                }
            })
            
            await this.likeRepository.save(like)

            return {
                message: "you liked this thread!",
                like
            }
        } catch (error) {
            throw new Error (error.message)
        }
    }

    async delete (threadId: number, loginSession: any): Promise<any> {
        try {
            const like = await this.likeRepository.findOne ({
                where: {
                    thread: {
                        id: threadId,
                    },
                    user: {
                        id: loginSession.user.id
                    }
                }
            })

            if (!like) {
                throw new Error ("you did not like this thread")
            }

            await this.likeRepository.delete({
                id: like.id
            })

            return {
                message: "you unliked this thread",
                like: like
            }
        } catch (error) {
            throw new Error ("something went wrong on the server")
        }
    }
}

export default new LikesService()