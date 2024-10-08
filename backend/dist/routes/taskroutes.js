"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskcontroller_1 = require("../controllers/taskcontroller");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.use(authMiddleware_1.authMiddleware);
router.get('/:boardId', taskcontroller_1.getTasks);
router.post('/:boardId', taskcontroller_1.createTask);
router.post('/:taskId/comment', taskcontroller_1.addComment);
exports.default = router;
