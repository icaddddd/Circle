import { error } from "console"
import { AppDataSource } from "./data-source"
import { Thread } from "./entities/Thread"
import * as express from "express"
import { Request, Response } from "express"
import router from "./route/route"


AppDataSource.initialize()
    .then(async() => {
        const app = express()
        const port = 5000

        app.use(express.json())
        app.use("/api/v1", router)

        app.get("/", (req: Request, res: Response) => {
            res.send("Hello World!")
        })

        app.listen(port, () => {
            console.log(`server is running on http://localhost:${port}`)
        })
    })

    .catch((error) => console.log(error))

   

