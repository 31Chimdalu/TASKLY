import nodeSchedule from 'node-schedule';
import { taskService } from './taskservice';
import { organizationModel } from '../models/organizationmodel';
import nodemailer from 'nodemailer';
import { Types } from 'mongoose';
import { User } from '../models/usermodel';

export const organizationService = {
    createOrganization: async (name: string, ownerId: string) => {
        return await organizationModel.create({ name, owner: new Types.ObjectId(ownerId) });
    },
    scheduleWeeklyReports: async () => {
        nodeSchedule.scheduleJob('0 0 * * 0', async () => { // Run at midnight every Sunday
            const organizations = await organizationModel.find().populate<{ owner: User }>('owner');

            for (const organization of organizations) {
                if (!organization.owner || !('email' in organization.owner)) {
                    throw new Error('Owner not populated or missing email');
                }

                const report = await taskService.generateWeeklyReport(organization._id.toString());
                await organizationService.sendReport((organization.owner as User).email, report);
            }
        });
    },

    sendReport: async (email: string, report: any) => {
        const transporter = nodemailer.createTransport({
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

        await transporter.sendMail(mailOptions);
    },
};
