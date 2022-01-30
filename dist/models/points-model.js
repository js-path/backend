"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pointModel = void 0;
const mongoose_1 = require("mongoose");
const PointSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    point: { type: Number },
    timestamp: { type: Date, default: new Date() },
    reason: { type: String }
});
const pointModel = (0, mongoose_1.model)('Point', PointSchema);
exports.pointModel = pointModel;
//# sourceMappingURL=points-model.js.map