import { Router } from 'express'
import { validateJWT } from '../middlewares/validate-jwt'
import { getverifydata,update_data,GetUpdatePassword } from '../controllers/index.js'

const router = Router()

router.post('/',[validateJWT],getverifydata )
//router.get('/update_data',[validateJWT],update_data)
router.get('/UpdatePassword',[validateJWT],GetUpdatePassword)





module.exports = router
