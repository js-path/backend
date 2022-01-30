"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerModel = void 0;
const mongoose_1 = require("mongoose");
const RegisterSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: false, required: true },
    phoneNumber: { type: String, required: true },
    username: { type: String, unique: false, required: true },
    password: { type: String, required: true },
    activationLink: { type: String, required: true }
});
const registerModel = (0, mongoose_1.model)('Register', RegisterSchema);
exports.registerModel = registerModel;
//# sourceMappingURL=register-model.js.map