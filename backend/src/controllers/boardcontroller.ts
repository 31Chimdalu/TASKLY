import { Request, Response } from 'express';
import { boardService } from '../services/boardservice';

export const getBoards = async (req: Request, res: Response) => {
    const { organizationId } = req.user;
    const boards = await boardService.getBoards(organizationId);
    res.json(boards);
};

export const createBoard = async (req: Request, res: Response) => {
    const { organizationId } = req.user;
    const { name } = req.body;
    const board = await boardService.createBoard(organizationId, name);
    res.status(201).json(board);
};

export const inviteUser = async (req: Request, res: Response) => {
    const { boardId } = req.params;
    const { email } = req.body;

    try {
        await boardService.inviteUser(boardId, email);
        res.status(200).json({ message: 'User invited successfully' });
    } catch (error) {
        if (error instanceof Error){
            res.status(400).json({ message: error.message });
        }else{
            res.status(400).json({ message: 'An error occured' });
        }
    }
};