// import { Request, Response } from "express";
// import ProfileUserService from "../services/ProfileUserService";

// class UserController{
//     async findRandom(req: Request, res: Response) {
//         try {
//             const response = await ProfileUserService.find(req.query)
    
//             return res.status(200).json(response)
//         } catch (error) {
//             return res.status(500).json({error: error.message})
//         }
//     }
// }

// export default new UserController()