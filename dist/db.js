"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usr = exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.db = mongoose_1.default
    .connect("mongodb+srv://samedkusnale8:SAMM2001@cluster0.kvsrvog.mongodb.net/?retryWrites=true&w=majority");
// exports.db = db;
const usrSchema = new mongoose_1.default.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});
exports.usr = mongoose_1.default.model("usr", usrSchema);
//# sourceMappingURL=db.js.map