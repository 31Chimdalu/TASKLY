import { Router } from 'express';
import { getTasks, createTask, addComment} from '../controllers/taskcontroller';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware);
router.get('/:boardId', getTasks);
router.post('/:boardId', createTask);
router.post('/:taskId/comment', addComment);

export default router;
