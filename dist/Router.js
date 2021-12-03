"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = __importStar(require("express"));
const router = express.Router();
exports.router = router;
const Controller_1 = require("./Controller");
const express_validator_1 = require("express-validator");
router.post("/register", [
    (0, express_validator_1.check)("name", "Անունը չպետք է լինի դատարկ։").isLength({ min: 1, max: 15 }),
    (0, express_validator_1.check)("lastName", "Ազգանունը չպետք է լինի դատարկ։").isLength({ min: 1, max: 25 }),
    (0, express_validator_1.check)("phoneNumber", "Հեռ․ համարը պետք  է պարունակի թվեր։").isLength({ min: 1, max: 30 }).isNumeric(),
    (0, express_validator_1.check)("email", "Սխալ էլ․ հասցե։").isLength({ min: 1, max: 30 }).isEmail(),
    (0, express_validator_1.check)("username", "Username ֊ը չպետք է լինի դատարկ։").isLength({ min: 1, max: 20 }),
    (0, express_validator_1.check)("password", "Գաղտնաբառը պետք է լինի 10 նիշից երկար։").isLength({ min: 10, max: 30 })
], Controller_1.controller.registration);
router.post("/login", Controller_1.controller.login);
//# sourceMappingURL=Router.js.map