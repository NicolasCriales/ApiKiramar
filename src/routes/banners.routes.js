import { Router } from 'express'
import { getbanners,getproducts_banners } from '../controllers/index.js'

const router = Router()

router.get('/', getbanners)
router.get('/products', getproducts_banners)





module.exports = router
