"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phoneNumber: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    badges: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Badges' },
    points: { type: Number }
});
const userModel = (0, mongoose_1.model)('User', UserSchema);
exports.userModel = userModel;
//# sourceMappingURL=user-model.js.map