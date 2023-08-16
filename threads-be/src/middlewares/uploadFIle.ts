import { NextFunction, Request, Response } from 'express'
import * as multer from 'multer' 
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: "dvjeeregs",
    api_key: "824371712787679",
    api_secret: "emhxriNR_S_4mTF64aK1kCFClik"
})

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
        uploadFile.single(fieldname)(req, res, function(err){
            const file = req.file

            if (!file) {
                return res.status(400).json({
                    error: 'no file uploaded, please input your file!'
                })
            }

            try {
                cloudinary.uploader.upload(file.path, (error, result) => {
                    if (error) {
                        return res.status(500).json({
                            error: "failed upload to cloudinary! try again!"
                        })
                    }

                    res.locals.filename = result.secure_url
                    next()
                })

            } catch (error) {
                return res.status(400).json({
                    error: error
                })
            }

        })
    }
}
