import { taskModel } from '../models/taskmodel';
import { notificationService } from './notificationservice';
import { Types } from 'mongoose';

export const taskService = {
    getTasks: async (boardId: string, filters: any) => {
        const query = { boardId: new Types.ObjectId(boardId), ...filters };
        return await taskModel.find(query);
    },
    createTask: async (boardId: string, taskData: any) => {
        const task = await taskModel.create({ boardId: new Types.ObjectId(boardId), ...taskData });
    
        if (taskData.dueDate) {
            await notificationService.scheduleDueDateReminder(task._id.toString());
        }
    
        return task;
    },
    addComment: async (taskId: string, userId: string, text: string) => {
        const task = await taskModel.findById(taskId);
        if (!task) {
            throw new Error('Task not found');
        }
    
        task.comments.push({
            text, userId: new Types.ObjectId(userId),
            createdAt: new Date(),
        });
        await task.save();
    
        await notificationService.notifyOnComment(taskId, text, userId);
    
        return task;
    },
    generateWeeklyReport: async (organizationId: string) => {
        const tasks = await taskModel.find({ organizationId: new Types.ObjectId(organizationId) });

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
    },
};
