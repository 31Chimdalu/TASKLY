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
exports.inviteUser = exports.createBoard = exports.getBoards = void 0;
const boardservice_1 = require("../services/boardservice");
const getBoards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { organizationId } = req.user;
    const boards = yield boardservice_1.boardService.getBoards(organizationId);
    res.json(boards);
});
exports.getBoards = getBoards;
const createBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { organizationId } = req.user;
    const { name } = req.body;
    const board = yield boardservice_1.boardService.createBoard(organizationId, name);
    res.status(201).json(board);
});
exports.createBoard = createBoard;
const inviteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { boardId } = req.params;
    const { email } = req.body;
    try {
        yield boardservice_1.boardService.inviteUser(boardId, email);
        res.status(200).json({ message: 'User invited successfully' });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(400).json({ message: 'An error occured' });
        }
    }
});
exports.inviteUser = inviteUser;
