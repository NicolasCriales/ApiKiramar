import { Router } from 'express'
import { validateJWT } from '../middlewares/validate-jwt'
import { getsearch, getsearchsupplier } from '../controllers/index.js'

const router = Router()

router.get('/',[validateJWT], getsearch)
router.get('/supplier',[validateJWT], getsearchsupplier)




module.exports = router