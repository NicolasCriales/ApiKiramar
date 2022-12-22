import { getConnection, sql } from '../database/connection';
import { tsqlbanners } from '../tsql';
import { pagination } from '../helpers/pagination';

const getbanners = async (req, res) => {
	try {
		const pool = await getConnection();
		const { id, CodProveedor } = req.query;

		if (CodProveedor.length != 0) {
			var addCodProveedor = `and codProveedor='${CodProveedor}'  `;
		} else {
			var addCodProveedor = ``;
		}

		var products_banners = tsqlbanners.banners + addCodProveedor;
		const result = await pool.request().input('id', id).query(products_banners);

		if (result.rowsAffected[0] > 0) {
			const Banners = result.recordsets[0];
			res.send({
				Banners,
			});
		} else {
			res.status(401).json({
				message: 'No se encontro resultado de BANNERS',
			});
		}
	} catch (error) {
		console.log('Error: Problemas al consultar los banner', error);
		res.status(500).json({
			message: 'Problemas al consultar los banners',
		});
	}
};

const getidbanners = async (req, res) => {
	try {
		const pool = await getConnection();
		const result = await pool.request().query(tsqlbanners.idbanners);
		const idBanners = result.recordsets[0];
		res.send({
			idBanners,
		});
	} catch (error) {
		console.log('Error: Problemas al consultar los banners ', error);
		res.status(500).json({
			message: 'Problemas al consultar los banners',
		});
	}
};

module.exports = {
	getbanners,
	getidbanners,
};
