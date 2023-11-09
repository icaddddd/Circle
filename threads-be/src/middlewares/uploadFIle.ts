import { NextFunction, Request, Response } from 'express'
import multer = require('multer')

export const upload = (fieldname : string) => {
    const storage = multer.diskStorage({

        destination: function (req, file, cb) {
            cb(null, "./uploads/")
        },

        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now()
            cb(null, file.fieldname + "-" + uniqueSuffix + ".png")
        }

    })

    const uploadFile = multer ({ storage: storage})

    return (req: Request, res: Response, next: NextFunction) => {
        uploadFile.single(fieldname)(req, res, function(err: any){
            if (err) {
                return res.status(500).json({ err })
            }

            res.locals.filename = req.file.filename
            next()
        })
    }
}
