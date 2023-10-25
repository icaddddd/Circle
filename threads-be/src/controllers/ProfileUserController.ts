import { Request, Response } from "express";
import ProfileUserService from "../services/ProfileUserService";

class UserController{
    patch(req: Request, res: Response){
        ProfileUserService.patch(req, res)
    }

    findOne(req: Request, res: Response){
        ProfileUserService.findOne(req, res)
    }

    findAll(req: Request, res: Response){
        ProfileUserService.findAll(req, res)
    }
}

export default new UserController()