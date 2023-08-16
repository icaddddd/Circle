import * as express from "express"
import { Request, Response } from "express"
import controllersThreads from "../controllers/ThreadController"
import AuthController from "../controllers/AuthController"
import { upload } from "../middlewares/uploadFIle"
import authenticate from "../middlewares/auth"



const router = express.Router()

router.get("/", (req: Request, res: Response) => {
    res.send("Hello from v1")
})

router.get("/threads", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Hello this is threads!"
    })
})

router.get("/thread", authenticate, controllersThreads.find)
router.get("/thread/:id", authenticate, controllersThreads.findOne)
router.post("/thread", authenticate, upload('image'), controllersThreads.create)
router.delete("/thread/delete/:id", controllersThreads.delete)
router.patch("/thread/update/:id", controllersThreads.update)

router.post("/auth/register", AuthController.register)
router.post("/auth/login", AuthController.login)

router.get("/check", authenticate, AuthController.checking)

export default router