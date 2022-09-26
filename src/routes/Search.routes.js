import { Router } from 'express'
import { validateJWT } from '../middlewares/validate-jwt'
import { getsearch, getsearchsupplier } from '../controllers/index.js'

const router = Router()

router.get('/', getsearch)
router.get('/supplier', getsearchsupplier)




module.exports = router