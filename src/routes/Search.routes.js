import { Router } from 'express'
//import { validateJWT } from '../middlewares/validate-jwt'
import { getsearch } from '../controllers/index.js'

const router = Router()

router.get('/',getsearch)



module.exports = router