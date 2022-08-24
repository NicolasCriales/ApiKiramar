import { Router } from 'express'
import { validateJWT } from '../middlewares/validate-jwt'
import { getverifydata } from '../controllers/index.js'

const router = Router()

router.get('/',[validateJWT],getverifydata )



module.exports = router
