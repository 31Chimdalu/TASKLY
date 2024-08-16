"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.boardModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const boardSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    organizationId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Organization', required: true },
});
exports.boardModel = mongoose_1.default.model('Board', boardSchema);
