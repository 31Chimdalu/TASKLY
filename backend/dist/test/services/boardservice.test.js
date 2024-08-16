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
const boardservice_1 = require("../../services/boardservice");
describe('Board Service', () => {
    it('should create a new board', () => __awaiter(void 0, void 0, void 0, function* () {
        const board = yield boardservice_1.boardService.createBoard('organizationId', 'New Board');
        expect(board).toHaveProperty('name', 'New Board');
    }));
    it('should get boards', () => __awaiter(void 0, void 0, void 0, function* () {
        const boards = yield boardservice_1.boardService.getBoards('organizationId');
        expect(boards).toBeInstanceOf(Array);
    }));
});
