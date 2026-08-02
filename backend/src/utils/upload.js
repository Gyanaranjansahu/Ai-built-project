import cloudinary from "../config/cloudinarry.js";


export const uploadImage = async(filepath,folder)=>{

    try{

        const result = await cloudinary.uploader.upload(
            filepath,
            {
                folder
            }
        );

        return result;


    }catch(error){

        console.log("Cloudinary Error:",error);

        throw error;

    }

}