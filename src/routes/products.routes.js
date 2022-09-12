import { Router } from 'express'
import { validateJWT } from '../middlewares/validate-jwt'
import { getproducts, getproducts_individually, getproducts_discount,getproducts_lastunits } from '../controllers/index.js'

const router = Router()

router.get('/', [validateJWT],getproducts)
router.get('/article', [validateJWT], getproducts_individually)
router.get('/discount', [validateJWT], getproducts_discount)
router.get('/lastunits', [validateJWT], getproducts_lastunits)



module.exports = router


