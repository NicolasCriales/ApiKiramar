import { response } from 'express'
import { generateJWT } from '../helpers/auth/generate-jwt.js'
import { isValidJWT } from '../middlewares/validate-jwt.js'

const getJWT = async (req, res = response) => {
    const { keyword } = req.body
    try {
        const token = await generateJWT(keyword)
        res.json({
            token,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Contacte al administrador',
        })
    }
}

const verifyJWT = async (req, res = response) => {
	const token = req.header('x-token')
    if (await isValidJWT(token)) {
		res.json({
			isValid: 1
		})
	} else {
		res.status(401).json({
			isinvalid:'El token es invalido'
		})
	}

}

module.exports = {
    getJWT,
	verifyJWT,
}
