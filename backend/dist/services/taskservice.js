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
exports.taskService = void 0;
const taskmodel_1 = require("../models/taskmodel");
const notificationservice_1 = require("./notificationservice");
const mongoose_1 = require("mongoose");
exports.taskService = {
    getTasks: (boardId, filters) => __awaiter(void 0, void 0, void 0, function* () {
        const query = Object.assign({ boardId: new mongoose_1.Types.ObjectId(boardId) }, filters);
        return yield taskmodel_1.taskModel.find(query);
    }),
    createTask: (boardId, taskData) => __awaiter(void 0, void 0, void 0, function* () {
        const task = yield taskmodel_1.taskModel.create(Object.assign({ boardId: new mongoose_1.Types.ObjectId(boardId) }, taskData));
        if (taskData.dueDate) {
            yield notificationservice_1.notificationService.scheduleDueDateReminder(task._id.toString());
        }
        return task;
    }),
    addComment: (taskId, userId, text) => __awaiter(void 0, void 0, void 0, function* () {
        const task = yield taskmodel_1.taskModel.findById(taskId);
        if (!task) {
            throw new Error('Task not found');
        }
        task.comments.push({
            text, userId: new mongoose_1.Types.ObjectId(userId),
            createdAt: new Date(),
        });
        yield task.save();
        yield notificationservice_1.notificationService.notifyOnComment(taskId, text, userId);
        return task;
    }),
    generateWeeklyReport: (organizationId) => __awaiter(void 0, void 0, void 0, function* () {
        const tasks = yield taskmodel_1.taskModel.find({ organizationId: new mongoose_1.Types.ObjectId(organizationId) });
        const completedTasks = tasks.filter(task => task.status === 'done');
        const pendingTasks = tasks.filter(task => task.status !== 'done');
        const averageCompletionTime = completedTasks.reduce((sum, task) => {
            const timeTaken = new Date(task.updatedAt).getTime() - new Date(task.createdAt).getTime();
            return sum + timeTaken;
        }, 0) / completedTasks.length;
        return {
            completedTasks: completedTasks.length,
            pendingTasks: pendingTasks.length,
            averageCompletionTime,
        };
    }),
};
