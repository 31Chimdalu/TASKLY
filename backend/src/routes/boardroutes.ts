import { Router } from 'express';
import { getBoards, createBoard, inviteUser } from '../controllers/boardcontroller';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware);
router.get('/', getBoards);
router.post('/', createBoard);
router.post('/:boardId/invite', inviteUser);

export default router;
