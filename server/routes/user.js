const express = require('express')
const multer = require('multer')
const router = express.Router()
const userSignUpCntrl = require('../controller/user/userSignUp')
const userSignInCntrl = require('../controller/user/userSignIn')
const authToken = require('../common/authToken')
const Mulstorage = require('../multer/ActivityImageStorage')
const userDetialCntrl = require('../controller/user/userDetial')
const userLogOut = require('../controller/user/userLogOut')
const allUserCntrl = require('../controller/user/allUsers')
const updateUserCnrtl = require('../controller/user/updateUser')
const verifyToken = require('../controller/user/verifyToken')
const generateOtpCntrl = require('../controller/user/generateOtp')
const resendOtpCntrl = require('../controller/user/resendOtp')
const DeleteUserCnrtl = require('../controller/user/deleteUser')
const ChangeProfilePicCntrl = require('../controller/user/ChangeProfilePicCntrl')
const ProfilePicstorage = require('../multer/profilePicStorage')
const UpdateProfileCntrl = require('../controller/user/UpdateProfileCntrl')
const UpdateAdressCntrl = require('../controller/user/UpdateAdressContrl')
const changePassCntrl = require('../controller/user/changePassCntrl')
const newPasswordCntrl = require('../controller/user/newPasswordCntrl')
const AddActivityCntrl = require('../controller/Activity/AddActivityCntrl')
const activityModel = require('../models/ActivityModel')

const upload=multer({storage:ProfilePicstorage})
const uploadActivity=multer({storage:Mulstorage})

router.get("/checkauth",authToken,verifyToken)
router.post("/sign-up",userSignUpCntrl)
router.post("/login",userSignInCntrl)
router.get("/user-detials",authToken,userDetialCntrl)
router.get("/logOut",userLogOut)
router.post("/changeProfilePic",authToken,upload.single('profile'),ChangeProfilePicCntrl)
router.post("/changepassword",changePassCntrl)
router.post("/newPassword",newPasswordCntrl)
//OTP 

router.post("/generate-otp",generateOtpCntrl)
router.post("/resend-otp",resendOtpCntrl)

//User

router.post("/update-profile",authToken,UpdateProfileCntrl)
router.post("/update-adress",authToken,UpdateAdressCntrl)
router.post("/all-user",authToken,allUserCntrl)
router.post("/update-user",authToken,updateUserCnrtl)
router.post("/delete-user",authToken,DeleteUserCnrtl)

//Activity
router.post("/AddActivity",authToken,uploadActivity.array('images'),AddActivityCntrl)
router.get('/fetchActivites',async(req,res)=>{
    try{
        const activities = await  activityModel.find().populate("creator_id");
        res.json({
            data:activities,
            success:true,
            error:false,
            message:"Activities fetched successfully"
        })
    }catch(err){
        res.status(500).json({ error: 'Failed to fetch activities' });
    }
})
router.post('Add_activityUser',authToken,async(req,res)=>{
    const userid = req.userid
    const {activity_id}=req.body

    const updateactivity = activityModel.updateOne({_id:activity_id}, { $push: { members: { $each: activity_id } } })
})

module.exports = router 

