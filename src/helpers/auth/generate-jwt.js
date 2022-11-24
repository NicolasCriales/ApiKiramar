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
const transaction_id = "id paymentes"
const app_code = "DV-DISKIRAMAR-STG-CO-SERVER"
const user_id = "token"
const app_key = "x0TNuW5w3E4c1lOwlsfys57ZeZUTNe"
const for_md5 = transaction_id+"_"+app_code+"_"+user_id+"_"+app_key
const stoken = CryptoJS.SHA256(for_md5.encode)
const print(stoken)
*/
module.exports = {
	generateJWT,
	GetToken,
};
