import { Router } from 'express';
import { getJWT, verifyJWT, prueba,prueba2 } from '../controllers/index.js';

const router = Router();
//[validateJWT],
router.get('/jwt', getJWT);
router.get('/jwt/verify', verifyJWT);

router.get('/prueba', prueba);  
router.get('/prueba2', prueba2); 

module.exports = router;
