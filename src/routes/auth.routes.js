import { Router } from 'express'
import { getJWT, verifyJWT,prueba } from '../controllers/index.js'

const router = Router()
//[validateJWT],
router.get('/jwt', getJWT)
router.get('/jwt/verify', verifyJWT)

router.get('/prueba', prueba)





module.exports = router
