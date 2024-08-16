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
exports.boardService = void 0;
const boardmodel_1 = require("../models/boardmodel");
const usermodel_1 = require("../models/usermodel");
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.boardService = {
    getBoards: (organizationId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield boardmodel_1.boardModel.find({ organizationId });
    }),
    createBoard: (organizationId, name) => __awaiter(void 0, void 0, void 0, function* () {
        return yield boardmodel_1.boardModel.create({ organizationId, name });
    }),
    inviteUser: (boardId, email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield usermodel_1.userModel.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        const board = yield boardmodel_1.boardModel.findById(boardId);
        if (!board) {
            throw new Error('Board not found');
        }
        // Logic to send email invitation
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'You are invited to join a board',
            text: `You have been invited to join the board: ${board.name}. Click here to join: [link]`,
        };
        yield transporter.sendMail(mailOptions);
    }),
};
