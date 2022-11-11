import { Router } from 'express';
import { validateJWT } from '../middlewares/validate-jwt';
import { getcity, getdepartment } from '../controllers/index.js';

const router = Router();
///
router.get('/', [validateJWT], getcity);
router.get('/department', [validateJWT], getdepartment);

module.exports = router;
