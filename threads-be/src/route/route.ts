import * as express from "express"
import { Request, Response } from "express"
import controllersThreads from "../controllers/controllers-threads"


const router = express.Router()

router.get("/", (req: Request, res: Response) => {
    res.send("Hello from v1")
})

router.get("/threads", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Hello this is threads!"
    })
})

router.get("/thread", controllersThreads.find)
router.get("/thread/:id", controllersThreads.findOne)
router.post("/thread/create", controllersThreads.create)
router.delete("/thread/delete/:id", controllersThreads.delete)
router.patch("/thread/update/:id", controllersThreads.update)

export default router