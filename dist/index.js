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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const Router_1 = require("./Router");
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/", express_1.default.static(path_1.default.join(__dirname, "/../src/public/home_page")));
app.use("/login", express_1.default.static(path_1.default.join(__dirname, "/../src/public/login")));
app.use("/register", express_1.default.static(path_1.default.join(__dirname, "/../src/public/register")));
app.get("/test", (req, res) => {
    res.send(JSON.stringify(path_1.default.join(__dirname, "/../src/public/homepage")));
});
app.use("/", Router_1.router);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        app.listen(process.env.PORT, () => {
            // tslint:disable-next-line:no-console
            console.log(`[+] server started on port ${process.env.PORT}`);
        });
        yield mongoose_1.default.connect(process.env.MONGO_DB_CONNNECT_STRING, () => {
            // tslint:disable-next-line:no-console
            console.log('\n[+] mongodb connected');
        });
    }
    catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
    }
});
start();
//# sourceMappingURL=index.js.map