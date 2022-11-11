import { getConnection, sql } from '../database/connection';
import { tsqlcity } from '../tsql';

const getcity = async (req, res) => {
	try {
		const pool = await getConnection();
		const result = await pool.request().query(tsqlcity.city);
        
		if (result.rowsAffected[0] > 0) {
			res.send({
				city: result.recordsets,
			});
		} else {
			res.status(500).json({
				message: 'No se encontro resultado de ciudades',
			});
		}
	} catch (error) {
		console.log('Error: No se pudo consultar las ciudades ', error);
		res.status(500).json({
			message: 'Problemas al consultar las ciudades',
		});
	}
};

const getdepartment = async (req, res) => {
	try {
		const pool = await getConnection();
		const result = await pool.request().query(tsqlcity.department);

		if (result.rowsAffected[0] > 0) {
			res.send({
				department: result.recordsets,
			});
		} else {
			res.status(500).json({
				message: 'No se encontro resultado de los departamentos',
			});
		}
	} catch (error) {
		console.log('Error: No se pudo consultar los departamentos ', error);
		res.status(500).json({
			message: 'Problemas al consultar los departamentos',
		});
	}
};

module.exports = {
	getcity,
	getdepartment,
};
