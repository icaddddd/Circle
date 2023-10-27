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
    const image = req.file.filename;
    const loginSession = res.locals.loginSession.user;
    console.log("login session", loginSession);
    try {
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
      });

      const cloudinaryResponse = await cloudinary.uploader.upload(
        "./uploads/" + image
      );

      const thread = this.threadRepository.create({
        content: content.content,
        image: cloudinaryResponse.url,
        user: loginSession,
      });

      const createThread = await this.threadRepository.save(thread);

      return res.status(200).json(createThread);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }

  // async delete(req: Request, res:Response){
  //     const id = parseInt(req.params.id)
  //     const deleteThread = await this.threadRepository.delete(id)
  //     return res.status(200).json(deleteThread)
  // }

  // async update(req:Request, res:Response){
  //     const id = parseInt(req.params.id)
  //     const thread = await this.threadRepository.findOne({
  //         where : {
  //             id
  //         }
  //     })

  //     const data = req.body

  //     if (data.content != ""){
  //         thread.content = data.content
  //     }
  //     if (data.image != ""){
  //         thread.image = data.image
  //     }

  //     const updatedThread = this.threadRepository.save(thread)
  //     return res.status(200).json(updatedThread)
  // }
}

export default new ThreadServices();
