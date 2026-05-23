const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
   service: 'gmail',
   host : "smtp.gmail.com",
   port: "",
   secure : true,
   auth: {
     user: process.env.EMAIL_USER, // Our Email and Password
     pass: process.env.EMAIL_PASS
   }
}) 

function triggerMail (mailOptions, callback){
      try{
       transporter.sendMail(mailOptions, (err, info)=>{
           if(err){
               callback(err)
           }else{
               callback(null, info)
           }
       })
      }catch{
       callback(err);
      }
}

module.exports = { triggerMail};