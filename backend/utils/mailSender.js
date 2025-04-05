import nodemailer from "nodemailer";

const mailSender = async (email, body, title) => {
    try{
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST, 
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER, 
                pass: process.env.MAIL_PASS, 
            }
        })
        console.log("trasporter tak thik hai");

        let info = await transporter.sendMail({
            from: `"Studynotion" <${process.env.MAIL_USER}>`, // sender address 
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`, 
        });
        console.log("INFO -> ", info);
        return info;
    }
    catch(error){
        console.log("Error aa gaya");
        console.error(error);
    }
}

export default mailSender;