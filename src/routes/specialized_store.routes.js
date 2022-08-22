import { Router } from 'express'
//import { validateJWT } from '../middlewares/validate-jwt'
import { getspecialized_store } from '../controllers/index.js'

const router = Router()

router.get('/',getspecialized_store)



module.exports = router