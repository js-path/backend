"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});
const userModel = (0, mongoose_1.model)('User', schema);
exports.userModel = userModel;
//# sourceMappingURL=User.js.map