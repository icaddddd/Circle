// import { NextFunction, Request, Response } from 'express'
// import multer = require('multer')

// export const upload = (fieldname : string) => {
//     const storage = multer.diskStorage({

//         destination: function (req, file, cb) {
//             cb(null, "./uploads/")
//         },

//         filename: function (req, file, cb) {
//             const uniqueSuffix = Date.now()
//             cb(null, file.fieldname + "-" + uniqueSuffix + ".png")
//         }

//     })

//     const uploadFile = multer ({ storage: storage})

//     return (req: Request, res: Response, next: NextFunction) => {
//         uploadFile.single(fieldname)(req, res, function(err: any){
//             if (err) {
//                 return res.status(500).json({ err })
//             }

//             res.locals.filename = req.file.filename
//             next()
//         })
//     }
// }

import { NextFunction, Request, Response } from "express";
import multer = require('multer')
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from "multer-storage-cloudinary";


interface Params {
    allowedFormats: string[];
    transformation: { width: number; height: number; crop: string }[];
    folder: string;
  }
  
export const upload = (image: string) => {
    cloudinary.config({
            cloud_name: 'dvjeeregs',
            api_key: '824371712787679',
            api_secret: 'emhxriNR_S_4mTF64aK1kCFClik'
        });

    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
        folder: "circle",
        allowedFormats: ["jpg", "png"],
        transformation: [{ width: 500, height: 500, crop: "limit" }],
        } as Params,
    });

    const uploadFile = multer({ storage: storage });

    return (req: Request, res: Response, next: NextFunction) => {
        uploadFile.single(image)(req, res, function (err: any) {
        if (err) {
            console.log(err);
            return res.status(400).json({ error: "file upload failed.", err });
        }
        const locals = Object.assign({}, res.locals, req.body);
        res.locals = locals;
        if (req.file) {
            res.locals.filename = req.file.filename;
            res.locals.cloudinaryUrl = req.file.path; // URL Cloudinary untuk file yang diupload
        }
        next();
        });
    };
};
