const activityModel = require('../../models/ActivityModel');

async function AddActivityCntrl(req,res){
    try{
        const image =[]
        req.files.forEach(element => {
            image.push(element.filename)
        });

        console.log(image);
        
        const ActvityData =await activityModel.create({...req.body,creator_id:req.userid,users:[],images:image})
        console.log(ActvityData);
        
        res.json({
            data:ActvityData,
            success:true,
            error:false,
            message:"Activity added successfully"
        })

        

    }catch(error){
        res.json({
            success:false,
            error:true,
            message:error.message ||error
        })
    }
    }

    module.exports = AddActivityCntrl