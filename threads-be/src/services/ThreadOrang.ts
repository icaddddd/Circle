import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Thread } from "../entities/Thread";

export class ThreadOrang {
  private readonly threadRepository: Repository<Thread> =
    AppDataSource.getRepository(Thread);
  async findOne(req: any, res: any) {
    try {
      const threadOrang = await this.threadRepository.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(threadOrang);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}
export default new ThreadOrang();
