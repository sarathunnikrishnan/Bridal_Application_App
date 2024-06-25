const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
   service: 'gmail',
   host : "smtp.gmail.com",
   port: "",
   secure : true,
   auth: {
     user: 'sarathunnikrishnan18@gmail.com', // Our Email and Password
     pass: "klvwncwlxcuyvuml"
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