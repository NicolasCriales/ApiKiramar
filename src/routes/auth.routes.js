import { Router } from 'express';
import { getJWT, verifyJWT, prueba,prueba2 } from '../controllers/index.js';

const router = Router();
//[validateJWT],
router.get('/jwt', getJWT);
router.get('/jwt/verify', verifyJWT);

module.exports = router;
