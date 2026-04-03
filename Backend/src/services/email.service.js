import dotenv from 'dotenv'
dotenv.config()
import nodemailer from 'nodemailer';



const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        type:'OAuth2',
        user:process.env.google_user,
        clientId:process.env.google_client_id,
        clientSecret:process.env.google_client_secret,
        refreshToken:process.env.google_refresh_token
    }
})


transporter.verify((error,success)=>{
    if(error){
        console.error('error connecting to email service',error);
    }else{
        console.log('email service is ready to send message');
    }
})

// Function to send email
export const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Your Name" <${process.env.google_user}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};




export default transporter ;