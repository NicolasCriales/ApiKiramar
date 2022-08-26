import { Router } from 'express'
import { validateJWT } from '../middlewares/validate-jwt'
import {createuser } from '../controllers/index.js'

const router = Router()

router.post('/',createuser )


module.exports = router
