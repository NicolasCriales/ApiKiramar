import { Router } from 'express'
//import { validateJWT } from '../middlewares/validate-jwt'
import { getsupplier,getcategorysupplier, getcodcategorysupplier,getcategorydkasa,getcategorydkasaproduct } from '../controllers/index.js'

const router = Router()

router.get('/',getsupplier)
router.get('/category',getcategorysupplier)
router.get('/category/product',getcodcategorysupplier)
router.get('/Dkasa',getcategorydkasa)
router.get('/Dkasa/product',getcategorydkasaproduct)




module.exports = router