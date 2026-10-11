/*import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
   
    const transporter = nodemailer.createTransport({
        host : 'smtp.gmail.com',
        port : 587,
        secure : false,
        requireTLS : true,
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

    // 3. ईमेल भेजें
    await transporter.sendMail(mailOptions);
};

export default sendEmail;

*/



import 'dotenv/config';
import * as sibApiV3Sdk from '@getbrevo/brevo';

const sendEmail = async (options) => {
    let defaultClient = sibApiV3Sdk.ApiClient.instance;
    let apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.BREVO_API_KEY; 

    let apiInstance = new sibApiV3Sdk.TransactionalEmailsApi();
    let sendSmtpEmail = new sibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = options.subject;
    sendSmtpEmail.htmlContent = options.html;
    sendSmtpEmail.sender = { 
        name: "My App Team", 
        email: process.env.SENDER_EMAIL
    };
    sendSmtpEmail.to = [{ 
        email: options.email 
    }];

    try {
        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log('Email successfully sent via Brevo HTTP API. Data:', JSON.stringify(data));
        return data;
    } catch (error) {
        console.error("Brevo API sending failed:", error);
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
