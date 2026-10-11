import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
    // Port 465 (secure: true) Gmail ke liye zyada reliable hota hai production me
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465, 
        secure: true, // 465 ke liye true karein
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: options.email,       
        subject: options.subject,
        html: options.html       
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully in production:", info.messageId);
        return info;
    } catch (error) {
        // Yeh Render ke dashboard par exact error print karega
        console.error("Nodemailer Production Error Details:", error);
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
