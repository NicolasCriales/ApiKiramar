import { Router } from 'express'
import { validateJWT } from '../middlewares/validate-jwt'
import { getverifydata,getrecoverpassword,GetUpdatePassword,getsendmail,getnewpassword } from '../controllers/index.js'

const router = Router()

router.post('/',[validateJWT],getverifydata )
router.post('/UpdatePassword',[validateJWT],GetUpdatePassword)
router.post('/sendmail',[validateJWT],getsendmail)
router.post('/recoverpassword',getrecoverpassword)
router.get('/newpassword',getnewpassword)







module.exports = router
