import { Router } from 'express'
import { getbanners,getproducts_banners,getbanners_releases,getproducts_releases } from '../controllers/index.js'

const router = Router()

router.get('/', getbanners)
router.get('/products', getproducts_banners)
router.get('/banners_releases', getbanners_releases)
router.get('/banners_releases/products', getproducts_releases)







module.exports = router
