import { Repository } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import {
  loginThreadSchema,
  registerThreadSchema,
} from "../utils/validatros/thread";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

class AuthService {
  private readonly authRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async register(req: Request, res: Response): Promise<Response> {
    try {
      const { fullname, username, email, password } = req.body;
      const { error, value } = registerThreadSchema.validate(req.body);

      if (error) {
        return res.status(500).json({
          error: error.details[0].message,
        });
      }

      const checkEmail = await this.authRepository.count({
        where: {
          email: value.email,
          username: value.username,
        },
      });

      if (checkEmail > 0) {
        return res.status(400).json("email already exist!");
      }

      const passwordHashed = await bcrypt.hash(value.password, 10);

      const user = this.authRepository.create({
        fullname: value.fullname,
        username: value.username,
        email: value.email,
        password: passwordHashed,
      });

      const createUser = await this.authRepository.save(user);
      console.log(createUser);
      return res.status(200).json(createUser);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    const JWT_SECRET_KEY = "SecretKey";
    try {
      const data = req.body;

      const { error, value } = loginThreadSchema.validate(data);
      if (error) {
        return res.status(400).json({ error: error });
      }

      const checkEmail = await this.authRepository.findOne({
        where: {
          email: value.email,
        },
        select: [
          "id",
          "email",
          "password",
          "fullname",
          "username",
          "picture",
          "description",
        ],
        relations: ["followings", "followers"],
      });

      if (!checkEmail) {
        return res.status(400).json("Error email or password!");
      }

      const password = await bcrypt.compare(
        value.password,
        checkEmail.password
      );
      if (!password) {
        return res.status(400).json({
          error: "email or password wrong!",
        });
      }

      const user = {
        id: checkEmail.id,
        email: checkEmail.email,
        password: checkEmail.password,
        fullname: checkEmail.fullname,
        username: checkEmail.username,
        picture: checkEmail.picture,
        description: checkEmail.description,
        followers_count: checkEmail.followers.length,
        followings_count: checkEmail.followings.length,
      };
      const token = jwt.sign({ user }, JWT_SECRET_KEY, {
        expiresIn: "4h",
      });
      return res.status(200).json({
        message: "login sukses",
        user,
        token,
      });
    } catch (error) {
      return res.status(500).json("There's an error");
    }
  }

  async checking(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;
      console.log("loginsession", loginSession);

      const user = await this.authRepository.findOne({
        where: { id: loginSession.user.id },
        select: [
          "id",
          "email",
          "username",
          "fullname",
          "password",
          "picture",
          "description",
        ],
        relations: ["followers", "followings"],
      });
      return res.status(200).json({
        message: "token is valid",
        user: {
          id: user.id,
          fullname: user.fullname,
          username: user.username,
          email: user.email,
          picture: user.picture,
          description: user.description,
          followers_count: user.followers.length,
          followings_count: user.followings.length,
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: "error",
        error,
      });
    }
  }
}

export default new AuthService();
