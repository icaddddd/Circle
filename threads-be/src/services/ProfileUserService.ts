import { Repository } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";

const cloudinary = require("cloudinary").v2;

class UserServices {
  private readonly userRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async patch(req: Request, res: Response) {
    try {
      const filename = req.file.filename;
      const data = req.body;
      const loginSession = res.locals.loginSession;

      const user = await this.userRepository.findOne({
        where: { id: loginSession.user.id },
      });

      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
      });

      const cloudinaryResponse = await cloudinary.uploader.upload(
        "./uploads/" + filename
      );

      user.description = data.description;
      user.fullname = data.fullname;
      user.username = data.username;
      user.picture = cloudinaryResponse.url;

      const anu = await this.userRepository.save(user);

      return res.status(200).json(anu);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const id = res.locals.loginSession.userId;
      const userProfile = await this.userRepository.findOne({
        where: { id: id },
      });

      return res.status(200).json(userProfile);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const threadProfile = await this.userRepository.findOne({
        where: {
          id
        },
        relations: {
          threads: {
            replies: true,
            likes: true
          }
        }
      })

      return res.status(200).json(threadProfile);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
}

export default new UserServices();
