import { response } from 'express'
import { generateJWT } from '../helpers/auth/generate-jwt.js'
import { isValidJWT } from '../middlewares/validate-jwt.js'
import bcryptjs from "bcryptjs";
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
var CryptoJS = require("crypto-js");



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
   /* console.log('#########################################################')
    console.log('####### AUTH TOKEN TEST')
    console.log('#########################################################')
    
    const server_application_code = 'DV-DISKIRAMAR-STG-CO-SERVER'
    const server_app_key = 'x0TNuW5w3E4c1lOwlsfys57ZeZUTNe'
    const datatime = new Date().getTime()
    const unix_timestamp = datatime.toString().slice(0,10)
    console.log( 'UNIX TIMESTAMP: %s',unix_timestamp)
    const uniq_token_string = server_app_key + unix_timestamp
    console.log( 'UNIQ STRING: %s', uniq_token_string)

    const crypto = require('crypto');

    const hash = crypto.createHash('sha256');
    const string =  uniq_token_string;
    const hashedString = hash.update(string, 'utf-8');
    const uniq_token_hash= hashedString.digest('hex');
    console.log( 'UNIQ HASH: %s', uniq_token_hash)

    const buff =new Buffer.from(server_application_code)
    //const base64data = buff.toString('base64');*/



const app_code = 'DV-DISKIRAMAR-STG-CO-SERVER'
const app_key = 'x0TNuW5w3E4c1lOwlsfys57ZeZUTNe'
const unix =  (new Date()).getTime()
//const timestamp = unix.toString().slice(0,10)
const key_time = app_key + unix
const uniq_token =  CryptoJS.SHA256(key_time);
const str_union = `${app_code};${unix};${uniq_token}`
const token = Buffer.from(str_union).toString('base64')
console.log(token)


 
        res.send({  
            token: token
        })
}



module.exports = {
    getJWT,
	verifyJWT,
    prueba
}
