import { Router } from 'express'
import { getdatasheet } from '../controllers/index.js'
import { validateJWT } from '../middlewares/validate-jwt'

const router = Router()

router.get('/', [validateJWT],getdatasheet)




module.exports = router
