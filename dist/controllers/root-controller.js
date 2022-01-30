"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_service_1 = require("../service/token-service");
const path_1 = __importDefault(require("path"));
function default_1(req, res, next) {
    try {
        // tslint:disable-next-line:no-console
        console.log(JSON.stringify(req.headers));
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.sendFile(path_1.default.join(__dirname, "/../../src/public/home_page/index.html"));
        }
        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return res.sendFile(path_1.default.join(__dirname, "/../../src/public/home_page/index.html"));
        }
        const userData = token_service_1.tokenService.validate(accessToken);
        if (!userData) {
            return res.sendFile(path_1.default.join(__dirname, "/../../src/public/home_page/index.html"));
        }
        return res.sendFile(path_1.default.join(__dirname, "/../../src/public/profile/index.html"));
        // req.user = userData;
        next();
    }
    catch (e) {
        return res.sendFile(path_1.default.join(__dirname, "/../src/public/home_page/index.html"));
    }
}
exports.default = default_1;
;
//# sourceMappingURL=root-controller.js.map