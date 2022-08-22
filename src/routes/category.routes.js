import { Router } from 'express'
//import { validateJWT } from '../middlewares/validate-jwt'
import { getcategory,getproductcategory } from '../controllers/index.js'

const router = Router()

router.get('/',getcategory )
router.get('/product',getproductcategory )




module.exports = router
