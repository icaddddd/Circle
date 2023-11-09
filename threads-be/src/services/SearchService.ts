import { Like, Repository } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";

class SearchService {
  private readonly userRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async findAll(req: Request, res: Response) {
    try {
      const searchUser = req.query;
      const users = await this.userRepository.find({
        where: [
          {
            fullname: Like(`%${searchUser.q}%`),
          },
          {
            username: Like(`%${searchUser.q}%`),
          },
        ],
      });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new SearchService
