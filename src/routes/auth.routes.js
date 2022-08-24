import { Router } from 'express'
import { getJWT, verifyJWT } from '../controllers/index.js'

const router = Router()

router.get('/jwt', getJWT)
router.get('/jwt/verify', verifyJWT)




module.exports = router
