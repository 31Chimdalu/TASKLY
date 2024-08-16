import { Request, Response } from 'express';
import { notificationService } from '../services/notificationservice';

export const getNotifications = async (req: Request, res: Response) => {
    const { userId } = req.user;
    const notifications = await notificationService.getNotifications(userId);
    res.json(notifications);
};
