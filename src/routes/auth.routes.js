import { Router } from 'express';
import { getJWT, verifyJWT, version_app } from '../controllers/index.js';

const router = Router();
//[validateJWT],
router.get('/jwt', getJWT);
router.get('/jwt/verify', verifyJWT);
router.get('/version', version_app);



module.exports = router;
