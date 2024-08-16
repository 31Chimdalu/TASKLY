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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
describe('Task Controller', () => {
    let token;
    let boardId;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const loginResponse = yield (0, supertest_1.default)(server_1.default)
            .post('/api/auth/login')
            .send({ username: 'testuser', password: 'testpass' });
        token = loginResponse.body.token;
        const boardResponse = yield (0, supertest_1.default)(server_1.default)
            .post('/api/boards')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Test Board' });
        boardId = boardResponse.body.id;
    }));
    it('should get tasks', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default)
            .get(`/api/tasks/${boardId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    }));
    it('should create a new task', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default)
            .post(`/api/tasks/${boardId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'New Task', description: 'Task description' });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('title', 'New Task');
    }));
});
