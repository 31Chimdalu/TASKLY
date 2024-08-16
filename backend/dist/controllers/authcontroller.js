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
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const authservice_1 = require("../services/authservice");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, organizationName } = req.body;
    try {
        const user = yield authservice_1.authService.register(username, password, organizationName);
        res.status(201).json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            // Handle known Error type
            res.status(400).json({ message: error.message });
        }
        else {
            // Handle unknown error type
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const token = yield authservice_1.authService.login(username, password);
        res.json({ token });
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});
exports.login = login;
