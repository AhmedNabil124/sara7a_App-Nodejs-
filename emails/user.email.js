const nodemailer = require("nodemailer");
module.exports.sendEmail = async (options) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "an1484613@gmail.com", // generated ethereal user
      pass: "abszbuwwabxibsbj", // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: '"Ahmed Nabil" <an1484613@gmail.com>', // sender address
    to: options.email, // list of receivers  
    subject: "my name is ahmed nabil", // Subject line
    html: `
    
    <div>
    <img src='https://www.google.com.eg/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'/>
    <h1>${options.message}</h1>
    <a href='http://localhost:3000/users/verfiy/${options.token}'>verfiy</a>
    </div>
    `, // html body
  },(err,info)=>{
    if(err){
      console.log(err);
    } else{
      console.log(info);
    }
  });
};
