import { Router } from 'express'
import { validateJWT } from '../middlewares/validate-jwt'
import { getproducts, getproducts_individually, getproducts_discount } from '../controllers/index.js'

const router = Router()

router.get('/', [validateJWT],getproducts)
router.get('/article', getproducts_individually)
router.get('/discount',[validateJWT], getproducts_discount)


module.exports = router


