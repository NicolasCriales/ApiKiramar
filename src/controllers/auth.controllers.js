import { response } from 'express';
import { generateJWT } from '../helpers/auth/generate-jwt.js';
import { isValidJWT } from '../middlewares/validate-jwt.js';
import axios from 'axios';
import { getConnection } from './../database/connection';
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

const version_app = async (req,res) => {
	const pool = await getConnection();
	const result = await pool.request().query(`select app_version, url_tienda_ios, url_tienda_android from appkiramar_version`); 
	const version = result.recordsets[0]
	res.send({
		version
	})

}
module.exports = {
	getJWT,
	verifyJWT,
	version_app
};
