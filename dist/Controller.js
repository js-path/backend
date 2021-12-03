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
exports.controller = void 0;
const express_validator_1 = require("express-validator");
const User_1 = require("./models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("./config");
const generateToken = (id, username) => {
    const payload = {
        id, username
    };
    return jsonwebtoken_1.default.sign(payload, config_1.secretKey, { expiresIn: "12H" });
};
class Controller {
    registration(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ message: "Գրանցման էռորները ", errors });
                }
                const { name, lastName, phoneNumber, email, username, password } = req.body;
                const candidate = yield User_1.userModel.findOne({ username });
                if (candidate) {
                    return res.status(400).json({ message: "Username ֊ը զբաղված է։" });
                }
                const hashedPasswd = bcrypt_1.default.hashSync(password, 10);
                const user = new User_1.userModel({ name, lastName, phoneNumber, email, username, password: hashedPasswd });
                yield user.save();
                return res.json({ message: "Դուք հաջողությամբ գրանցվել եք։" });
            }
            catch (e) {
                // tslint:disable-next-line:no-console
                console.log(e);
                res.status(400).json({ message: 'Գրանցման ընթացքում սխալ է տեղի ունեցել։' });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const user = yield User_1.userModel.findOne({ username });
                if (!user) {
                    return res.status(400).json({ message: `Օգտատեր ${username} ֊ը չի գտնվել։` });
                }
                const validPasswd = bcrypt_1.default.compareSync(password, user.password);
                if (!validPasswd) {
                    return res.status(400).json({ message: 'Գաղtնաբառը սխալ է։' });
                }
                const token = generateToken(user._id, user.username);
                return res.json({ token });
            }
            catch (e) {
                // tslint:disable-next-line:no-console
                console.log(e);
                res.status(400).json({ message: 'Լօգինի ընթացքում սխալ է տեղի ունեցել' });
            }
        });
    }
}
const controller = new Controller();
exports.controller = controller;
//# sourceMappingURL=Controller.js.map