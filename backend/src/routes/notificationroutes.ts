import { Router } from 'express';
import { getNotifications } from '../controllers/notificationcontroller';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware);
router.get('/', getNotifications);

export default router;
