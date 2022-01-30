"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.badgesModel = void 0;
const mongoose_1 = require("mongoose");
const BadgesSchema = new mongoose_1.Schema({
    badgeName: { type: String },
    icon: { type: String },
    shortcut: { type: String, unique: true }
});
const badgesModel = (0, mongoose_1.model)('Badges', BadgesSchema);
exports.badgesModel = badgesModel;
//# sourceMappingURL=badges-model.js.map