import { Router } from 'express'
import { validateJWT } from '../middlewares/validate-jwt'
import { getorderb2b, getfactureb2b, getorderb2c, getfactureb2c } from '../controllers/index.js'

const router = Router()

router.get('/b2b',[validateJWT],getorderb2b )
router.get('/b2b/facture',[validateJWT], getfactureb2b)

router.get('/b2c',[validateJWT],getorderb2c)
router.get('/b2c/facture',[validateJWT], getfactureb2c)





module.exports = router
