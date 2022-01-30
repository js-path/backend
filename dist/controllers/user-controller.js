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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const express_validator_1 = require("express-validator");
const user_service_1 = require("../service/user-service");
class UserController {
    registration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ message: "Գրանցման էռորները ", errors });
                }
                const serverResponse = yield user_service_1.userService.registration(req, res, next);
                return serverResponse;
            }
            catch (e) {
                // tslint:disable-next-line:no-console
                console.log(e);
                res.status(400).json({ message: 'Գրանցման ընթացքում սխալ է տեղի ունեցել։' });
                next();
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ message: "Լօգինի էռորները ", errors });
                }
                const serverResponse = yield user_service_1.userService.login(req, res, next);
                return serverResponse;
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
            try {
                const serverResponse = yield user_service_1.userService.activate(req, res, next);
                return serverResponse;
            }
            catch (e) {
                // tslint:disable-next-line:no-console
                console.log(e);
                next();
            }
        });
    }
    getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_service_1.userService.getAllUsers();
                return res.json(users);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
const userController = new UserController();
exports.userController = userController;
//# sourceMappingURL=user-controller.js.map