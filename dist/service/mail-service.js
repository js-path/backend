"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class MailService {
    sendMail(to, activationLink) {
        return __awaiter(this, void 0, void 0, function* () {
            const transporter = nodemailer_1.default.createTransport({
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
                text: 'http://localhost:5000/api/activate/' + activationLink
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    // tslint:disable-next-line:no-console
                    console.log(error);
                }
                else {
                    // tslint:disable-next-line:no-console
                    console.log('Email sent: ' + info.response);
                }
            });
        });
    }
}
const mailService = new MailService();
exports.mailService = mailService;
//# sourceMappingURL=mail-service.js.map