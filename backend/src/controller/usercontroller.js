

import connect from "../schema/model.js";
async function userController(req,res){
try {
      let data=await connect.findOne({
        _id:req.user.id
    })
    console.log(data._id);
    
    if(!data){
        return res.status(400).json({
            text:"user not found"
        })
    }
    return res.status(200).json({
      text:"user find" ,
      user:{
        id:data._id,
      name:data.name,
        email:data.email
      }
    })
} catch (error) {
  return res.status(404).json({
    text:"user not found"
  })
}

}
export default userController