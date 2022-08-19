import { Router } from 'express'
//import { validateJWT } from '../middlewares/validate-jwt'
import { getworld } from '../controllers/index.js'

const router = Router()

router.get('/', getworld)
//router.get('/mundo', GetMundo)



module.exports = router


