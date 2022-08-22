import { Router } from 'express'
//import { validateJWT } from '../middlewares/validate-jwt'
import { getworld, getcategoryworld, getcategoryproduct } from '../controllers/index.js'

const router = Router()

router.get('/', getworld)
router.get('/category', getcategoryworld)
router.get('/category/product', getcategoryproduct)



module.exports = router


