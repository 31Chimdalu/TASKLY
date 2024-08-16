import { Request, Response } from 'express';
import { authService } from '../services/authservice';

export const register = async (req: Request, res: Response) => {
    const { username, password, organizationName } = req.body;
    try {
        const user = await authService.register(username, password, organizationName);
        res.status(201).json(user);
    } catch (error) {
            if (error instanceof Error) {
                // Handle known Error type
                res.status(400).json({ message: error.message });
            } else {
                // Handle unknown error type
                res.status(400).json({ message: 'An unknown error occurred' });
            }
        }
};

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const token = await authService.login(username, password);
        res.json({ token });
    } catch (error) {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};
