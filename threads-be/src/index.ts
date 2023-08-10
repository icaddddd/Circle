import { error } from "console"
import { AppDataSource } from "./data-source"
import { Thread } from "./entities/Thread"
import * as express from "express"
import { Request, Response } from "express"
import routes from "./route/route"
import exp = require("constants")

var cors = require('cors')
var app = express()

app.use(cors())


AppDataSource.initialize().then(async() => {
        const port = 5000

        app.use(express.json())
        app.use("/api/v1", routes)

        app.get("/", (req: Request, res: Response) => {
            res.send("Hello World!")
        })

        app.listen(port, () => {
            console.log(`server is running on http://localhost:${port}`)
        })
    })

    .catch((error) => console.log(error))

   

