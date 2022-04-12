import nodemailer from "nodemailer"


class MailService{
    async sendMail(to:string, activationLink:string){
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.SMTP_USER,
            to,
            subject: 'step learnin hub accouunt activation',
            text: 'http://localhost:5000/api/activate/'+activationLink
        };

        transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        });
    }
}

const mailService = new MailService()
export {mailService}