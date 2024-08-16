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
exports.addComment = exports.createTask = exports.getTasks = void 0;
const taskservice_1 = require("../services/taskservice");
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { boardId } = req.params;
    const tasks = yield taskservice_1.taskService.getTasks(boardId, req.query);
    res.json(tasks);
});
exports.getTasks = getTasks;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { boardId } = req.params;
    const { title, description, priority, labels, status, startDate, dueDate, assignee, attachments } = req.body;
    const task = yield taskservice_1.taskService.createTask(boardId, {
        title, description, priority, labels, status, startDate, dueDate, assignee, attachments
    });
    res.status(201).json(task);
});
exports.createTask = createTask;
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = req.params;
    const { text } = req.body;
    const userId = req.user.id;
    try {
        const task = yield taskservice_1.taskService.addComment(taskId, userId, text);
        res.status(201).json(task);
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
exports.addComment = addComment;
