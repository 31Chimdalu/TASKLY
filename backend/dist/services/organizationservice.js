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
exports.organizationService = void 0;
const node_schedule_1 = __importDefault(require("node-schedule"));
const taskservice_1 = require("./taskservice");
const organizationmodel_1 = require("../models/organizationmodel");
const nodemailer_1 = __importDefault(require("nodemailer"));
const mongoose_1 = require("mongoose");
exports.organizationService = {
    createOrganization: (name, ownerId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield organizationmodel_1.organizationModel.create({ name, owner: new mongoose_1.Types.ObjectId(ownerId) });
    }),
    scheduleWeeklyReports: () => __awaiter(void 0, void 0, void 0, function* () {
        node_schedule_1.default.scheduleJob('0 0 * * 0', () => __awaiter(void 0, void 0, void 0, function* () {
            const organizations = yield organizationmodel_1.organizationModel.find().populate('owner');
            for (const organization of organizations) {
                if (!organization.owner || !('email' in organization.owner)) {
                    throw new Error('Owner not populated or missing email');
                }
                const report = yield taskservice_1.taskService.generateWeeklyReport(organization._id.toString());
                yield exports.organizationService.sendReport(organization.owner.email, report);
            }
        }));
    }),
    sendReport: (email, report) => __awaiter(void 0, void 0, void 0, function* () {
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Weekly Task Report',
            text: `Weekly Task Report: ${JSON.stringify(report)}`,
        };
        yield transporter.sendMail(mailOptions);
    }),
};
