import { response } from 'express';
import jwt from 'jsonwebtoken';

const validateJWT = (req = request, res = response, next) => {
	const token = req.header('x-token');
	if (!token) {
		return res.status(401).json({
			message: 'No hay token en la petición',
		});
	}

	try {
		jwt.verify(token, process.env.SECRETORPRIVATEKEY);
		next();
	} catch (error) {
		console.log(error);
		return res.status(401).json({
			message: 'Token no válido',
		});
	}
};

const isValidJWT = token => {
	try {
		jwt.verify(token, process.env.SECRETORPRIVATEKEY);
		return true;
	} catch (err) {
		console.log('verifyJWT Error: ', err);
		return false;
	}
};

module.exports = {
	validateJWT,
	isValidJWT,
};
