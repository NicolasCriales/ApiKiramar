import { getConnection, sql } from '../database/connection';
import { tsqlspecialized_store } from '../tsql';
import { pagination } from '../helpers/pagination';

const getspecialized_store = async (req, res) => {
	try {
		const pool = await getConnection();
		const { page, limit } = req.query;
		const result = await pool.request().query(tsqlspecialized_store.specialized_store);
		if (result.rowsAffected[0] > 0) {
			let specialized_store = result.recordsets[0];
			specialized_store = await pagination(specialized_store, page, limit);
			res.send({
				specialized_store: specialized_store,
			});
		} else {
			res.status(500).json({
				message: 'No se encontro las tiendas especializadas',
			});
		}
	} catch (error) {
		console.log('Error: no se pudo consultar las tiendas especializadas');
		res.status(500).json({
			message: 'Problema al consultar las tiendas especializadas',
		});
	}
};
module.exports = {
	getspecialized_store,
};
