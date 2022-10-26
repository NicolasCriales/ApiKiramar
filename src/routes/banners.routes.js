import { Router } from 'express'
import { getbanners,getproducts_banners,getbanners_releases,getproducts_releases, getspecialized_store } from '../controllers/index.js'
import { validateJWT } from '../middlewares/validate-jwt'

const router = Router()

router.get('/', [validateJWT],getbanners)
router.get('/products',[validateJWT], getproducts_banners)
router.get('/banners_releases',[validateJWT], getbanners_releases)
router.get('/banners_releases/products',[validateJWT], getproducts_releases)
//router.get('/specialized_store',[validateJWT], getspecialized_store)







module.exports = router
