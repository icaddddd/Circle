// import { Repository } from "typeorm";
// import { User } from "../entities/User";
// import { AppDataSource } from "../data-source";
// import { response } from "express";

// class UserServices {
//     private readonly userRepository: Repository<User> = AppDataSource.getRepository(User)
    
//     async findRandom(reqQuery?: any): Promise<any> {
//        try {
//         const limit = parseInt(reqQuery.limit ?? 0)
//          const users = await this.userRepository
//          .createQueryBuilder('users')
//          .select()
//          .orderBy('RANDOM()')
//          .take(limit)
//          .getMany();


//          return (users)
//        } catch (error) {
//         throw new Error(error.message)
//        }
//     }
// }

// export default new UserServices()