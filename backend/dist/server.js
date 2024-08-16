"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const authroutes_1 = __importDefault(require("./routes/authroutes"));
const boardroutes_1 = __importDefault(require("./routes/boardroutes"));
const taskroutes_1 = __importDefault(require("./routes/taskroutes"));
const organizationroutes_1 = __importDefault(require("./routes/organizationroutes"));
const notificationroutes_1 = __importDefault(require("./routes/notificationroutes"));
const config_1 = require("./config/config");
const authMiddleware_1 = require("./middlewares/authMiddleware");
const rateLimitMiddleware_1 = require("./middlewares/rateLimitMiddleware");
const organizationservice_1 = require("./services/organizationservice");
const app = (0, express_1.default)();
// Middlewares
app.use(body_parser_1.default.json());
app.use(rateLimitMiddleware_1.rateLimitMiddleware);
// Routes
app.use('/api/auth', authroutes_1.default);
app.use('/api/boards', authMiddleware_1.authMiddleware, boardroutes_1.default);
app.use('/api/tasks', authMiddleware_1.authMiddleware, taskroutes_1.default);
app.use('/api/organizations', authMiddleware_1.authMiddleware, organizationroutes_1.default);
app.use('/api/notifications', authMiddleware_1.authMiddleware, notificationroutes_1.default);
// Database connection
mongoose_1.default.connect(config_1.config.dbUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));
// Schedule weekly reports
organizationservice_1.organizationService.scheduleWeeklyReports();
exports.default = app;
