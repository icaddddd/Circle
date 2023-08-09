import { Repository } from "typeorm";
import { Thread } from "../entities/Thread";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";

class ThreadServices{
        private readonly threadRepository: Repository<Thread> = 
        AppDataSource.getRepository(Thread);
        static find: any;

    async find(req: Request, res: Response): Promise<Response> {
        try {
            const threads = await this.threadRepository.find({
                relations: ["user"]
            })
            return res.status(200).json(threads)
        } catch (err) {
            return res.status(500).json({error: "error while getting threads"})
        }
        
    }

    async findOne(req: Request, res: Response){
        const id = parseInt(req.params.id)
        const thread = await this.threadRepository.findOne({
            where: {
                id
            },
            relations: ["user"]
        })
        return res.status(200).json(thread)
    }

    async create(req: Request, res: Response){
        const data = req.body

        const thread = this.threadRepository.create({
           
            content: data.content,
            image: data.image,
           
        })
        
        const createThread = this.threadRepository.save(thread)
        return res.status(200).json(createThread)
    }

    async delete(req: Request, res:Response){
        const id = parseInt(req.params.id)
        const deleteThread = await this.threadRepository.delete(id)
        return res.status(200).json(deleteThread)
    }
    
    async update(req:Request, res:Response){
        const id = parseInt(req.params.id)
        const thread = await this.threadRepository.findOne({
            where : {
                id
            }
        })
        
        const data = req.body

       
     
        if (data.content != ""){
            thread.content = data.content
        }
        if (data.image != ""){
            thread.image = data.image
        }

        const updatedThread = this.threadRepository.save(thread)
        return res.status(200).json(updatedThread)
    }

}

export default new ThreadServices()