import { notificationModel } from '../models/notificationmodel';
import { taskModel } from '../models/taskmodel';
import nodeSchedule from 'node-schedule';
import { Types } from 'mongoose';

export const notificationService = {
    getNotifications: async (userId: string) => {
        return await notificationModel.find({ userId });
    },

    createNotification: async (userId: string, message: string) => {
        await notificationModel.create({ userId, message });
    },

    scheduleDueDateReminder: async (taskId: string) => {
        const task = await taskModel.findById(taskId).populate('assignee');
        if (!task || !task.dueDate) {
            throw new Error('Task or due date not found');
        }

        const dueDate = new Date(task.dueDate);
        const oneDayBefore = new Date(dueDate.getTime() - 24 * 60 * 60 * 1000);
        const twelveHoursBefore = new Date(dueDate.getTime() - 12 * 60 * 60 * 1000);
        const oneHourBefore = new Date(dueDate.getTime() - 60 * 60 * 1000);

        const assigneeId = task.assignee?.toString();
        if (!assigneeId) {
            throw new Error('Assignee not found');
        }

        nodeSchedule.scheduleJob(oneDayBefore, async () => {
            await notificationService.createNotification(assigneeId, `Task "${task.title}" is due in 1 day`);
        });
        nodeSchedule.scheduleJob(twelveHoursBefore, async () => {
            await notificationService.createNotification(assigneeId, `Task "${task.title}" is due in 12 hours`);
        });
        nodeSchedule.scheduleJob(oneHourBefore, async () => {
            await notificationService.createNotification(assigneeId, `Task "${task.title}" is due in 1 hour`);
        });
    },

    notifyOnComment: async (taskId: string, comment: string, userId: string) => {
        const task = await taskModel.findById(taskId).populate('assignee');
        if (!task) {
            throw new Error('Task not found');
        }

        const assigneeId = task.assignee?._id?.toString();
        if (!assigneeId) {
            throw new Error('Assignee not found');
        }

        await notificationService.createNotification(assigneeId, `New comment on task "${task.title}": ${comment}`);
    },
};
