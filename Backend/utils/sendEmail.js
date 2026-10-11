import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
   
    const transporter = nodemailer.createTransport({
        host: 'smtp-relay.brevo.com', 
        port: 587,
        secure: false, 
        auth: {
            user: process.env.SMTP_USER, 
            pass: process.env.SMTP_PASS  
        }
    });

    const mailOptions = {
        from: process.env.SENDER_EMAIL, 
        to: options.email,            
        subject: options.subject,
        html: options.html       
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email successfully sent via Brevo:", info.messageId);
        return info;
    } catch (error) {
        console.error("Brevo sending failed error:", error);
        throw error;
    }
};

export default sendEmail;




/*
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (options) => {
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev', 
      to: options.email,
      subject: options.subject,
      html: options.html,
    });

    return data;
  } catch (error) {
    console.error("email sending error",error);
    throw error;
  }
};

export default sendEmail;
*/
