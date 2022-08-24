import { Router } from 'express'
import { validateJWT } from '../middlewares/validate-jwt'
import { getcategory,getproductcategory } from '../controllers/index.js'

const router = Router()

router.get('/',[validateJWT],getcategory )
router.get('/product',[validateJWT],getproductcategory )




module.exports = router
