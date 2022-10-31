import { response } from 'express'
import { generateJWT } from '../helpers/auth/generate-jwt.js'
import { isValidJWT } from '../middlewares/validate-jwt.js'
import bcryptjs from "bcryptjs";


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

const prueba = async (req,res) => {
    console.log('#########################################################')
    console.log('####### AUTH TOKEN TEST')
    console.log('#########################################################')
    
    const server_application_code = 'DV-DISKIRAMAR-STG-CO-SERVER'
    const server_app_key = 'x0TNuW5w3E4c1lOwlsfys57ZeZUTNe'
    const unix_timestamp = new Date().getTime()
    console.log( 'UNIX TIMESTAMP: %s',unix_timestamp)
    const uniq_token_string = server_app_key + unix_timestamp
    console.log( 'UNIQ STRING: %s', uniq_token_string)

    const salt = bcryptjs.genSaltSync();
    const uniq_token_hash = bcryptjs.hashSync(uniq_token_string, salt)
    console.log( 'UNIQ HASH: %s', uniq_token_hash)

    const auth_token = Buffer.from(server_application_code,unix_timestamp,uniq_token_hash, 'utf8').toString('base64')
    console.log(auth_token);

        res.send({
            mensagge: auth_token
        })
}



module.exports = {
    getJWT,
	verifyJWT,
    prueba
}
