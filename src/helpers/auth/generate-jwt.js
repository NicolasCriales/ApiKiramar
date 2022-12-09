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
			const app_code = 'DV-KIRAMAR-CO-SERVER';
			const app_key = 'QGrSPyfeJwayGDw27Y0ILJRDBJ8IK9';
			const unix = new Date().getTime() + 100000;
			const timestamp = unix.toString().slice(0, 10);
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
/*
	const transaction_id = "PSE-49538"
				const app_code = "DV-DISKIRAMAR-STG-CO-SERVER"
				const user_id = "856f085bf-6154-47ac-9fc1-f6f6fccee"
				const app_key = "x0TNuW5w3E4c1lOwlsfys57ZeZUTNe"
				const for_md5 = transaction_id+"_"+app_code+"_"+user_id+"_"+app_key
				const stoken =md5(for_md5)
*/
module.exports = {
	generateJWT,
	GetToken,
};
