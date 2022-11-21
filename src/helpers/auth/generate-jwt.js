import jwt from 'jsonwebtoken';
var CryptoJS = require('crypto-js');


const generateJWT = (keyword = '') => {
	return new Promise((resolve, reject) => {
		const payload = { keyword };

		jwt.sign(
			payload,
			process.env.SECRETORPRIVATEKEY,
			{
				expiresIn: '12h',
			},
			(err, token) => {
				if (err) {
					console.log('Error: ', err);
					reject('No fue posible generar el token');
				} else {
					resolve(token);
				}
			}
		);
	});
};

const GetToken = () => {
	return new Promise((resolve, reject) => {
		try {
			const app_code = 'DV-DISKIRAMAR-STG-CO-SERVER';
			const app_key = 'x0TNuW5w3E4c1lOwlsfys57ZeZUTNe';
			const unix = new Date().getTime() + 100000;
			console.log('unix:',unix);
			const timestamp = unix.toString().slice(0, 10);
			console.log('timestamp:',timestamp);
			const key_time = app_key + timestamp;
			const uniq_token = CryptoJS.SHA256(key_time);
			const str_union = `${app_code};${timestamp};${uniq_token}`;
			const token = Buffer.from(str_union).toString('base64');
			resolve(token)
		} catch (error) {
			reject("Error generando token:", error)
		}
	})
}

module.exports = {
	generateJWT,
	GetToken,
};
