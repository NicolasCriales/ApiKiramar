import { Router } from 'express'
//import { validateJWT } from '../middlewares/validate-jwt'
import { getproducts, getproducts_individually, getproducts_discount } from '../controllers/index.js'

const router = Router()

router.get('/:IdListaPrecios', getproducts)
router.get('/:IdArticulo/:IdListaPrecios', getproducts_individually)
router.get('/discount/promotional/:IdListaPrecios', getproducts_discount)


module.exports = router


