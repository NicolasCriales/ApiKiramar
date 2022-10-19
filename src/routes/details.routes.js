import { Router } from 'express'
import { getdatasheet,gettypePQRS,getregisterPQRS,getidPQRS,getPQRS } from '../controllers/index.js'
import { validateJWT } from '../middlewares/validate-jwt'

const router = Router()

router.get('/', [validateJWT],getdatasheet)
router.get('/typePQRS', gettypePQRS)  
router.post('/registerPQRS', getregisterPQRS) 
router.get('/PQRS', getPQRS) 
router.get('/idPQRS', getidPQRS) 



module.exports = router
