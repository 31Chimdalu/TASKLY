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
const authservice_1 = require("../../services/authservice");
const usermodel_1 = require("../../models/usermodel");
const organizationservice_1 = require("../../services/organizationservice");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
jest.mock('../../models/userModel');
jest.mock('../organizationService');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');
describe('Auth Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('register', () => {
        it('should create a user and organization', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUser = { _id: 'user123', username: 'testuser', password: 'hashedpassword', organizationId: 'org123' };
            const mockOrganization = { _id: 'org123', name: 'TestOrg', owner: 'user123' };
            usermodel_1.userModel.create.mockResolvedValue(mockUser);
            organizationservice_1.organizationService.createOrganization.mockResolvedValue(mockOrganization);
            bcrypt_1.default.hash.mockResolvedValue('hashedpassword');
            const result = yield authservice_1.authService.register('testuser', 'password123', 'TestOrg');
            expect(usermodel_1.userModel.create).toHaveBeenCalledWith({ username: 'testuser', password: 'hashedpassword', organizationId: undefined });
            expect(organizationservice_1.organizationService.createOrganization).toHaveBeenCalledWith('TestOrg', 'user123');
            expect(result.organizationId).toEqual('org123');
        }));
    });
    describe('login', () => {
        it('should return a JWT token on successful login', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUser = { _id: 'user123', username: 'testuser', password: 'hashedpassword', organizationId: 'org123' };
            usermodel_1.userModel.findOne.mockResolvedValue(mockUser);
            bcrypt_1.default.compare.mockResolvedValue(true);
            jsonwebtoken_1.default.sign.mockReturnValue('mockToken');
            const result = yield authservice_1.authService.login('testuser', 'password123');
            expect(result).toEqual('mockToken');
        }));
    });
});
