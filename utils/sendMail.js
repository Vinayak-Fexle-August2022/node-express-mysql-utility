import nodemailer from "nodemailer";


export async function sendEmail(to_email_id, message){

    console.log(message);

    let transporter = nodemailer.createTransport({
    service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    let mailOptions = {
        from: 'process.env.EMAIL_USER',
        to: to_email_id,
        subject: 'reset password',
        text: message
    };

    // let mailSent;

    let mailSent = await transporter.sendMail(mailOptions);
    
    console.log(mailSent);
    return mailSent;
}
