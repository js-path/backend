"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenModel = void 0;
const mongoose_1 = require("mongoose");
const TokenSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    refreshToken: { type: String, required: true }
});
const TokenModel = (0, mongoose_1.model)('', TokenSchema);
exports.TokenModel = TokenModel;
//# sourceMappingURL=token-model.js.map