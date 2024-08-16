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
exports.notificationService = void 0;
const notificationmodel_1 = require("../models/notificationmodel");
const taskmodel_1 = require("../models/taskmodel");
const node_schedule_1 = __importDefault(require("node-schedule"));
exports.notificationService = {
    getNotifications: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield notificationmodel_1.notificationModel.find({ userId });
    }),
    createNotification: (userId, message) => __awaiter(void 0, void 0, void 0, function* () {
        yield notificationmodel_1.notificationModel.create({ userId, message });
    }),
    scheduleDueDateReminder: (taskId) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const task = yield taskmodel_1.taskModel.findById(taskId).populate('assignee');
        if (!task || !task.dueDate) {
            throw new Error('Task or due date not found');
        }
        const dueDate = new Date(task.dueDate);
        const oneDayBefore = new Date(dueDate.getTime() - 24 * 60 * 60 * 1000);
        const twelveHoursBefore = new Date(dueDate.getTime() - 12 * 60 * 60 * 1000);
        const oneHourBefore = new Date(dueDate.getTime() - 60 * 60 * 1000);
        const assigneeId = (_a = task.assignee) === null || _a === void 0 ? void 0 : _a.toString();
        if (!assigneeId) {
            throw new Error('Assignee not found');
        }
        node_schedule_1.default.scheduleJob(oneDayBefore, () => __awaiter(void 0, void 0, void 0, function* () {
            yield exports.notificationService.createNotification(assigneeId, `Task "${task.title}" is due in 1 day`);
        }));
        node_schedule_1.default.scheduleJob(twelveHoursBefore, () => __awaiter(void 0, void 0, void 0, function* () {
            yield exports.notificationService.createNotification(assigneeId, `Task "${task.title}" is due in 12 hours`);
        }));
        node_schedule_1.default.scheduleJob(oneHourBefore, () => __awaiter(void 0, void 0, void 0, function* () {
            yield exports.notificationService.createNotification(assigneeId, `Task "${task.title}" is due in 1 hour`);
        }));
    }),
    notifyOnComment: (taskId, comment, userId) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const task = yield taskmodel_1.taskModel.findById(taskId).populate('assignee');
        if (!task) {
            throw new Error('Task not found');
        }
        const assigneeId = (_b = (_a = task.assignee) === null || _a === void 0 ? void 0 : _a._id) === null || _b === void 0 ? void 0 : _b.toString();
        if (!assigneeId) {
            throw new Error('Assignee not found');
        }
        yield exports.notificationService.createNotification(assigneeId, `New comment on task "${task.title}": ${comment}`);
    }),
};
