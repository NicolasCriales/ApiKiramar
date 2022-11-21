import { response } from 'express';
import { generateJWT } from '../helpers/auth/generate-jwt.js';
import { isValidJWT } from '../middlewares/validate-jwt.js';
import axios from 'axios';
//import bcryptjs from "bcryptjs";
//import sha256 from 'crypto-js/sha256';
//import hmacSHA512 from 'crypto-js/hmac-sha512';
//import Base64 from 'crypto-js/enc-base64';
var CryptoJS = require('crypto-js');

const getJWT = async (req, res = response) => {
	const { keyword } = req.body;
	try {
		const token = await generateJWT(keyword);
		res.json({
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Contacte al administrador',
		});
	}
};

const verifyJWT = async (req, res = response) => {
	const token = req.header('x-token');
	if (await isValidJWT(token)) {
		res.json({
			isValid: 1,
		});
	} else {
		res.status(401).json({
			isinvalid: 'El token es invalido',
		});
	}
};

const prueba = async (req, res) => {
	const app_code = 'DV-DISKIRAMAR-STG-CO-SERVER';
	const app_key = 'x0TNuW5w3E4c1lOwlsfys57ZeZUTNe';
	const unix = new Date().getTime() + 100000;
	const timestamp = unix.toString().slice(0, 10);
	console.log(timestamp);
	const key_time = app_key + timestamp;
	const uniq_token = CryptoJS.SHA256(key_time);
	const str_union = `${app_code};${timestamp};${uniq_token}`;
	const token = Buffer.from(str_union).toString('base64');
	console.log(token);
	res.send({
		token: token,
	});
};
module.exports = {
	getJWT,
	verifyJWT,
	prueba
};
