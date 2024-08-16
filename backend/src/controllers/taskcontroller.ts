import { Request, Response } from 'express';
import { taskService } from '../services/taskservice';

export const getTasks = async (req: Request, res: Response) => {
    const { boardId } = req.params;
    const tasks = await taskService.getTasks(boardId, req.query);
    res.json(tasks);
};

export const createTask = async (req: Request, res: Response) => {
    const { boardId } = req.params;
    const { title, description, priority, labels, status, startDate, dueDate, assignee, attachments } = req.body;
    const task = await taskService.createTask(boardId, {
        title, description, priority, labels, status, startDate, dueDate, assignee, attachments
    });
    res.status(201).json(task);
};

export const addComment = async (req: Request, res: Response) => {
    const { taskId } = req.params;
    const { text } = req.body;
    const userId = req.user.id;

    try {
        const task = await taskService.addComment(taskId, userId, text);
        res.status(201).json(task);
    } catch (error) {
        if (error instanceof Error){
            res.status(400).json({ message: error.message });}
        else{
            res.status(400).json({ message: 'An error occured' });
        }
    }
};