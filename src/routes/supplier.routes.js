import { Router } from 'express'
import { validateJWT } from '../middlewares/validate-jwt'
import { getsupplier,getcategorysupplier, getcodcategorysupplier,getcategorydkasa,getcategorydkasaproduct } from '../controllers/index.js'

const router = Router()

router.get('/', [validateJWT],getsupplier)
router.get('/category', [validateJWT],getcategorysupplier)
router.get('/category/product', [validateJWT],getcodcategorysupplier)
router.get('/Dkasa', [validateJWT],getcategorydkasa)
router.get('/Dkasa/product', [validateJWT],getcategorydkasaproduct)




module.exports = router