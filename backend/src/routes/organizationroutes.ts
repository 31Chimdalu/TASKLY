import { Router } from 'express';
import { createOrganization } from '../controllers/organizationcontroller';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware);
router.post('/', createOrganization);

export default router;
