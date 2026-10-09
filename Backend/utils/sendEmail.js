import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
   
    const transporter = nodemailer.createTransport({
        host : '://gmail.com',
        port : 465,
        secure : true,
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
