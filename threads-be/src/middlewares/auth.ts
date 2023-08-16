import * as jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express"

const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
): Response => {
    const authorizationHeader = req.headers.authorization

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
        return res.status(401).json({
            error: "Belum login"
        })
    }

    const token = authorizationHeader.split(" ")[1]

    try {
        const loginSession = jwt.verify(token, "SecretKey")
        res.locals.loginSession = loginSession
        next()
    } catch(error){
        return res.status(401).json({
            error: "Token salah!"
        })
    }
}

export default authenticate