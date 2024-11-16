const nodeMailer=require('nodemailer');

const transporter=nodeMailer.createTransport({
    service:'gmail',
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS
    }
});

const mailoption={
    from:{
        name:'vibin',
        adress:'vibinveliyath@gmailcom'
    }
}

 const sendmailfun = async(tomailoption)=>{
    try{
        await transporter.sendMail({...mailoption,...tomailoption})
        return 'mail send to your email id'
    }catch(error){
        return error
    }
}

module.exports=sendmailfun