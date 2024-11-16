const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../../models/userModel')

async function userSignInCntrl(req,res){
try{
    const {email,password} = req.body
    

    if(!email){
        throw new Error("please provide email")
        
    }
    if(!password){
        throw new Error("please provide password")
        
    }

    const user = await userModel.findOne({email})
    if(!user){
        throw new Error("User Not Found")
        
    }
    
    const checkPassword =await bcrypt.compare(password,user.password)
    
    if(checkPassword){

        const token = await jwt.sign({data:{userid:user._id,name:user.name,email:user.email}},process.env.jwtSecrect)
        res.json({
            message:"Login successfull",
            data:{token:token,role:user.role},
            success:true,
            error:false
        })

    }else{
        throw new Error("Please check password")
    }

}catch(error){
    res.status(500).json({
        success:false,
        error:true,
        message:error.message ||error
    })
}
}

module.exports = userSignInCntrl