import { Router } from 'express'
import { getdatasheet,gettypePQRS,getregisterPQRS,getidPQRS,getPQRS, getregisterReview, getreview, getresponsePQRS, getVericationReview } from '../controllers/index.js'
import { validateJWT } from '../middlewares/validate-jwt'

const router = Router()

router.get('/', [validateJWT],getdatasheet)
router.get('/typePQRS',[validateJWT], gettypePQRS)  
router.post('/registerPQRS',[validateJWT], getregisterPQRS) 
router.post('/responsePQRS',[validateJWT], getresponsePQRS) 
router.get('/PQRS',[validateJWT], getPQRS) 
router.get('/idPQRS',[validateJWT], getidPQRS) 

router.get('/VericationReview',[validateJWT], getVericationReview) 
router.post('/registerReview',[validateJWT], getregisterReview) 
router.get('/review',[validateJWT], getreview) 





module.exports = router
