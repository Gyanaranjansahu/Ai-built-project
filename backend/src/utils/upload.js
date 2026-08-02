import cloudinary from "../config/cloudinarry.js";

export const uploadImage=async(filepath,folder)=>{
    try {
       return await cloudinary.uploader.upload(filepath,{
            folder:folder
        })
    } catch (error) {
        console.log(error)
        throw error;
    }
}