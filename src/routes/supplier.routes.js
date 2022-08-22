import { Router } from 'express'
//import { validateJWT } from '../middlewares/validate-jwt'
import { getsupplier,getcategorysupplier, getcodcategorysupplier } from '../controllers/index.js'

const router = Router()

router.get('/',getsupplier)
router.get('/category',getcategorysupplier)
router.get('/category/product',getcodcategorysupplier)



module.exports = router