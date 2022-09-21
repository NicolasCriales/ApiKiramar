import { Router } from 'express'
import { validateJWT } from '../middlewares/validate-jwt'
import { getspecialized_store } from '../controllers/index.js'

const router = Router()

router.get('/',[validateJWT], getspecialized_store)



module.exports = router