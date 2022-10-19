import { Router } from 'express'
import { getdatasheet,gettypePQRS,getregisterPQRS,getPQRS } from '../controllers/index.js'
import { validateJWT } from '../middlewares/validate-jwt'

const router = Router()

router.get('/', [validateJWT],getdatasheet)
router.get('/typePQRS', gettypePQRS)  
router.post('/registerPQRS', getregisterPQRS) 
router.get('/PQRS', getPQRS) 



module.exports = router
