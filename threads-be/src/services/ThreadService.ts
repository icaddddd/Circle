import { Repository } from "typeorm";
import { Thread } from "../entities/Thread";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";

const cloudinary = require("cloudinary").v2;

class ThreadServices {
  private readonly threadRepository: Repository<Thread> =
    AppDataSource.getRepository(Thread);
  static find: any;

  async find(reqQuery?: any, loginSession?: any): Promise<any> {
    try {
      const limit = parseInt(reqQuery.limit ?? 0);
      const threads = await this.threadRepository.find({
        relations: ["user", "likes.user", "replies"],
        order: { id: "DESC" },
        take: limit,
      });
      return threads.map((element) => ({
        id: element.id,
        content: element.content,
        image: element.image,
        posted_at: element.posted_at,
        user: element.user,
        replies_count: element.replies.length,
        likes_count: element.likes.length,
        is_liked: element.likes.some(
          (like: any) => like.user.id === loginSession.user.id
        ),
      }));
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async findOne(id: number, loginSession?: any): Promise<any> {
    try {
      const thread = await this.threadRepository.findOne({
        where: { id },
        relations: ["user", "replies", "likes.user"],
      });
      return {
        id: thread.id,
        content: thread.content,
        image: thread.image,
        posted_at: thread.posted_at,
        user: thread.user,
        replies_count: thread.replies.length,
        likes_count: thread.likes.length,
        is_liked: thread.likes.some(
          (like: any) => like.user.id === loginSession.user.id
        ),
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    const content = req.body;
    const image = req.file.path;
    const loginSession = res.locals.loginSession.user;
    console.log("login session", loginSession);
    try {

      const thread = this.threadRepository.create({
        content: content.content,
        image: image,
        user: loginSession,
      });

      const createThread = await this.threadRepository.save(thread);

      return res.status(200).json(createThread);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
}

export default new ThreadServices();
