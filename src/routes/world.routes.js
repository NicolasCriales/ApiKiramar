import { Router } from 'express'
import { validateJWT } from '../middlewares/validate-jwt'
import { getworld, getcategoryworld, getcategoryproduct } from '../controllers/index.js'

const router = Router()

router.get('/',[validateJWT], getworld)
router.get('/category', [validateJWT], getcategoryworld)
router.get('/category/product', [validateJWT], getcategoryproduct)



module.exports = router


