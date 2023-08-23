import { Request, Response } from "express";
import RepliesService from "../services/RepliesService";

class RepliesController {
    async find (req: Request, res: Response) {
        try {
            const response = await RepliesService.find(req.query)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({error: "something went error on the server"})
        }
    }

    async create (req: Request, res: Response) {
        try {
            const loginSession = res.locals.loginSession

            const response = await RepliesService.create(req.body, loginSession)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({error: "sonething went error on the server"})
        }
    }
}

export default new RepliesController()