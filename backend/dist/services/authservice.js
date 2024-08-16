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
exports.authService = void 0;
const usermodel_1 = require("../models/usermodel");
const organizationservice_1 = require("../services/organizationservice");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config/config");
const mongoose_1 = require("mongoose");
exports.authService = {
    register: (username, password, organizationName) => __awaiter(void 0, void 0, void 0, function* () {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield usermodel_1.userModel.create({
            username,
            password: hashedPassword,
            organizationId: undefined // Initial placeholder
        });
        const organization = yield organizationservice_1.organizationService.createOrganization(organizationName, user._id.toString());
        user.organizationId = new mongoose_1.Types.ObjectId(organization._id);
        yield user.save();
        return user;
    }),
    login: (username, password) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield usermodel_1.userModel.findOne({ username });
        if (!user)
            throw new Error('Invalid credentials');
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            throw new Error('Invalid credentials');
        const token = jsonwebtoken_1.default.sign({ id: user._id.toString(), organizationId: user.organizationId.toString() }, config_1.config.jwtSecret, { expiresIn: '1h' });
        return token;
    })
};
