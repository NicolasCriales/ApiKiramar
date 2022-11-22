import { Router } from 'express';
import {
	getbanners,
	getidbanners,
} from '../controllers/index.js';
import { validateJWT } from '../middlewares/validate-jwt';

const router = Router();

router.get('/', [validateJWT], getbanners);

router.get('/idbanners', [validateJWT], getidbanners);


module.exports = router;
