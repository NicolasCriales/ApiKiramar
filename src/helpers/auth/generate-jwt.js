import jwt from 'jsonwebtoken';

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

module.exports = {
	generateJWT,
};
