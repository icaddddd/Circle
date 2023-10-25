import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { Thread } from "../entities/Thread"

export class ThreadOrang {
    private readonly threadRepository: Repository<Thread> = AppDataSource.getRepository(Thread)
    async findOne(req: any, res: any) {
        const threadOrang = await this.threadRepository.findOne({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(threadOrang)
    }
}
export default new ThreadOrang()