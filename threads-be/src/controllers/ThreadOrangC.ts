import ThreadOrang from "../services/ThreadOrang";

export class ThreadOrangC {
    async findOne(req: any, res: any) {
        ThreadOrang.findOne(req, res)
    }
}
export default new ThreadOrangC();