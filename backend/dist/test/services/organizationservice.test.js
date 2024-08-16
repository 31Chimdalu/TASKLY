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
const organizationservice_1 = require("../../services/organizationservice");
const organizationmodel_1 = require("../../models/organizationmodel");
const taskservice_1 = require("../../services/taskservice");
const nodemailer_1 = __importDefault(require("nodemailer"));
const node_schedule_1 = __importDefault(require("node-schedule"));
const mongoose_1 = require("mongoose");
// Mocking the necessary modules and services
jest.mock('../../models/organizationModel');
jest.mock('../taskService');
jest.mock('nodemailer');
jest.mock('node-schedule');
describe('Organization Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('createOrganization', () => {
        it('should create an organization with the given name and ownerId', () => __awaiter(void 0, void 0, void 0, function* () {
            // Arrange
            const mockOrganization = {
                _id: new mongoose_1.Types.ObjectId(),
                name: 'TestOrg',
                owner: new mongoose_1.Types.ObjectId()
            };
            organizationmodel_1.organizationModel.create.mockResolvedValue(mockOrganization);
            // Act
            const result = yield organizationservice_1.organizationService.createOrganization('TestOrg', 'ownerId123');
            // Assert
            expect(organizationmodel_1.organizationModel.create).toHaveBeenCalledWith({
                name: 'TestOrg',
                owner: new mongoose_1.Types.ObjectId('ownerId123')
            });
            expect(result).toEqual(mockOrganization);
        }));
    });
    describe('scheduleWeeklyReports', () => {
        it('should schedule a weekly report for all organizations', () => __awaiter(void 0, void 0, void 0, function* () {
            // Arrange
            const mockOrganization = {
                _id: new mongoose_1.Types.ObjectId(),
                name: 'TestOrg',
                owner: { email: 'owner@example.com' }
            };
            const mockReport = { completedTasks: 5, pendingTasks: 3, averageCompletionTime: 3600 };
            organizationmodel_1.organizationModel.find.mockResolvedValue([mockOrganization]);
            taskservice_1.taskService.generateWeeklyReport.mockResolvedValue(mockReport);
            const mockSendMail = jest.fn();
            nodemailer_1.default.createTransport.mockReturnValue({ sendMail: mockSendMail });
            // Act
            yield organizationservice_1.organizationService.scheduleWeeklyReports();
            // Assert
            expect(node_schedule_1.default.scheduleJob).toHaveBeenCalledWith('0 0 * * 0', expect.any(Function));
            // Simulate the scheduled job execution
            const scheduledJobCallback = node_schedule_1.default.scheduleJob.mock.calls[0][1];
            yield scheduledJobCallback();
            expect(organizationmodel_1.organizationModel.find).toHaveBeenCalled();
            expect(taskservice_1.taskService.generateWeeklyReport).toHaveBeenCalledWith(mockOrganization._id);
            expect(mockSendMail).toHaveBeenCalledWith({
                from: expect.any(String),
                to: 'owner@example.com',
                subject: 'Weekly Task Report',
                text: `Weekly Task Report: ${JSON.stringify(mockReport)}`,
            });
        }));
        it('should throw an error if the owner email is missing', () => __awaiter(void 0, void 0, void 0, function* () {
            // Arrange
            const mockOrganization = {
                _id: new mongoose_1.Types.ObjectId(),
                name: 'TestOrg',
                owner: {} // Missing email
            };
            organizationmodel_1.organizationModel.find.mockResolvedValue([mockOrganization]);
            // Act & Assert
            yield expect(organizationservice_1.organizationService.scheduleWeeklyReports()).rejects.toThrow('Owner not populated or missing email');
        }));
    });
    describe('sendReport', () => {
        it('should send an email with the provided report', () => __awaiter(void 0, void 0, void 0, function* () {
            // Arrange
            const mockSendMail = jest.fn();
            nodemailer_1.default.createTransport.mockReturnValue({ sendMail: mockSendMail });
            const mockEmail = 'owner@example.com';
            const mockReport = { completedTasks: 5, pendingTasks: 3, averageCompletionTime: 3600 };
            // Act
            yield organizationservice_1.organizationService.sendReport(mockEmail, mockReport);
            // Assert
            expect(mockSendMail).toHaveBeenCalledWith({
                from: expect.any(String),
                to: mockEmail,
                subject: 'Weekly Task Report',
                text: `Weekly Task Report: ${JSON.stringify(mockReport)}`,
            });
        }));
    });
});
