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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = __importStar(require("express"));
const user_controller_1 = require("../controllers/user-controller");
const express_validator_1 = require("express-validator");
const auth_middleware_1 = __importDefault(require("../middlewares/auth-middleware"));
const router = express.Router();
exports.router = router;
// router.get("/")
router.post("/registration", [
    (0, express_validator_1.check)("name", "Անունը չպետք է լինի դատարկ։").isLength({ min: 1, max: 15 }),
    (0, express_validator_1.check)("lastName", "Ազգանունը չպետք է լինի դատարկ։").isLength({ min: 1, max: 25 }),
    (0, express_validator_1.check)("phoneNumber", "Հեռ․ համարը պետք  է պարունակի թվեր։").isLength({ min: 1, max: 30 }).isNumeric(),
    (0, express_validator_1.check)("email", "Սխալ էլ․ հասցե։").isLength({ min: 1, max: 30 }).isEmail(),
    (0, express_validator_1.check)("username", "Username ֊ը չպետք է լինի դատարկ։").isLength({ min: 1, max: 20 }),
    (0, express_validator_1.check)("password", "Գաղտնաբառը պետք է լինի 10 նիշից երկար։").isLength({ min: 10, max: 30 })
], user_controller_1.userController.registration);
router.post("/login", [
    (0, express_validator_1.check)("username", "Գրեք username ֊ը։").isLength({ min: 1, max: 20 }),
    (0, express_validator_1.check)("password", "Գրեք գաղտնաբառը։").isLength({ min: 1, max: 30 })
], user_controller_1.userController.login);
// router.get("/logout")
router.get("/activate/:link", user_controller_1.userController.activate);
router.get("/users", auth_middleware_1.default, user_controller_1.userController.getUsers); // տեստի համար
//# sourceMappingURL=index.js.map