import { v2 as cloudinary } from "cloudinary"

export function cloudinaryConfig() {
    cloudinary.config({
        cloud_name: "dvjeeregs",
        api_key: "824371712787679",
        api_secret: "emhxriNR_S_4mTF64aK1kCFClik"
    })
}