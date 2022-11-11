import { Router } from 'express';
import { validateJWT } from '../middlewares/validate-jwt';
import { getsearch, getsearchautocomplete } from '../controllers/index.js';

const router = Router();

router.get('/', [validateJWT], getsearch);
router.get('/autocomplete', [validateJWT], getsearchautocomplete);

module.exports = router;
