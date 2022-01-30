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
exports.userService = void 0;
const user_model_1 = require("../models/user-model");
const register_model_1 = require("../models/register-model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const mail_service_1 = require("./mail-service");
const token_service_1 = require("./token-service");
const uuid_1 = require("uuid");
class UserService {
    registration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, lastName, email, phoneNumber, username, password } = req.body;
                const ifUsername = yield user_model_1.userModel.findOne({ username }); // ստուգում ենք username ֊ը կա՞ գրանցվածների բազայում թե ոչ
                if (ifUsername) {
                    return res.status(400).json({ message: "Username ֊ը զբաղված է։" });
                }
                const ifEmail = yield user_model_1.userModel.findOne({ email }); // ստուգում ենք տվյալ email ֊ով գրանցվել են թե ոչ
                if (ifEmail) {
                    return res.status(400).json({ message: `${email} ֊ը արդեն գրանցված է։` });
                }
                const hashedPasswd = bcrypt_1.default.hashSync(password, 10);
                const activationLink = (0, uuid_1.v4)();
                const registerUser = new register_model_1.registerModel({ name, lastName, email, phoneNumber, username, password: hashedPasswd, activationLink });
                yield registerUser.save();
                mail_service_1.mailService.sendMail(email, activationLink);
                return res.status(200).json({ message: `Գնացեք ${email} և հաստատեք գրանցումը` });
            }
            catch (error) {
                // tslint:disable-next-line:no-console
                console.log(error);
                next();
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const user = yield user_model_1.userModel.findOne({ username });
                if (!user) {
                    return res.status(400).json({ message: `Օգտատեր ${username} ֊ը չի գտնվել։` });
                }
                const validPasswd = bcrypt_1.default.compareSync(password, user.password);
                if (!validPasswd) {
                    return res.status(400).json({ message: 'Գաղtնաբառը սխալ է։' });
                }
                const token = yield token_service_1.tokenService.generate(user._id, user.username);
                // tslint:disable-next-line:no-console
                console.log(token);
                res.json({ token });
            }
            catch (e) {
                // tslint:disable-next-line:no-console
                console.log(e);
                res.status(400).json({ message: 'Լօգինի ընթացքում սխալ է տեղի ունեցել' });
                next();
            }
        });
    }
    activate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const activationLink = req.params.link;
            const user = yield register_model_1.registerModel.findOne({ activationLink });
            if (!user) {
                return res.send("Ակտիվացման սխալ հղում։");
            }
            const { name, lastName, email, phoneNumber, username, password } = user;
            const newUser = new user_model_1.userModel({ name, lastName, email, phoneNumber, username, password });
            yield newUser.save();
            yield register_model_1.registerModel.deleteOne({ activationLink });
            return res.send("Դուք հաջողությոմբ գրանցվել եք");
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_model_1.userModel.find();
            return users;
        });
    }
}
const userService = new UserService();
exports.userService = userService;
//# sourceMappingURL=user-service.js.map