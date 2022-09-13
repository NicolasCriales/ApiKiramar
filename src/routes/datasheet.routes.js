import { Router } from 'express'
import { getdatasheet } from '../controllers/index.js'

const router = Router()

router.get('/', getdatasheet)




module.exports = router
