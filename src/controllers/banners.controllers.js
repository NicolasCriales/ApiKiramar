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
			res.status(500).json({
				message: 'No se encontro resultado de BANNERS',
			});
		}
	} catch (error) {
		console.log('Error: No se pudo consultar los banners ', error);
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
		console.log('Error: No se pudo consultar los banners ', error);
		res.status(500).json({
			message: 'Problemas al consultar los banners',
		});
	}
};

const getproducts_banners = async (req, res) => {
	try {
		const pool = await getConnection();
		const {
			IdListaPrecios,
			LikeNombreAlterno,
			LikeCodProveedor,
			category,
			preciomin,
			preciomax,
			orderP,
			orderF,
			page,
			limit,
		} = req.query;

		if (category.length != 0) {
			var addcategory = `and  mta.CodSubLinea in (${category})`;
		} else {
			var addcategory = ``;
		}

		if (LikeCodProveedor.length != 0) {
			var addcodsumin = `and PROV.codsumin='${LikeCodProveedor}' ) as AUX `;
		} else {
			var addcodsumin = `) as AUX `;
		}

		if (orderP.length != 0) {
			var addorderP = `ORDER BY AUX.NETO_CON_DESCUENTO ${orderP}`;
		} else {
			var addorderP = ``;
		}

		if (orderF.length != 0) {
			var addorderF = `ORDER BY AUX.FecIng ${orderF}`;
		} else {
			var addorderF = ``;
		}

		if (preciomin.length != 0 && preciomax.length != 0) {
			var filterprice = `WHERE AUX.NETO_CON_DESCUENTO >= '${preciomin}' AND AUX.NETO_CON_DESCUENTO <= '${preciomax}'`;
		} else {
			var filterprice = ``;
		}

		var products_banners =
			tsqlbanners.products_banners + addcategory + addcodsumin + filterprice + addorderP + addorderF;
		const result = await pool
			.request()
			.input('IdListaPrecios', sql.VarChar, IdListaPrecios)
			.input('LikeNombreAlterno', sql.VarChar, '%' + LikeNombreAlterno + '%')
			.query(products_banners);

		const result2 = await pool
			.request()
			.input('IdListaPrecios', sql.VarChar, IdListaPrecios)
			.input('LikeNombreAlterno', sql.VarChar, '%' + LikeNombreAlterno + '%')
			.input('LikeCodProveedor', sql.VarChar, LikeCodProveedor)
			.query(tsqlbanners.category);

		//MOSTRAMOS TODOS LOS PRODUCTOS DE LA BUSQUEDA Y FILTRO DE PRECIO
		var max_min = tsqlbanners.max_min + addcategory + addcodsumin;
		const result3 = await pool
			.request()
			.input('IdListaPrecios', sql.VarChar, IdListaPrecios)
			.input('LikeNombreAlterno', sql.VarChar, '%' + LikeNombreAlterno + '%')
			.query(max_min);

		//MOSTRAMOS TODOS LOS PRODUCTOS DE LA BUSQUEDA Y FILTRO PROVEEDOR
		//var sql_supplier = tsqlsearch.supplier + addcategory + addcodsumin
		const result4 = await pool
			.request()
			.input('IdListaPrecios', sql.VarChar, IdListaPrecios)
			.input('LikeNombreAlterno', sql.VarChar, '%' + LikeNombreAlterno + '%')
			.query(tsqlbanners.supplier);

		if (result.rowsAffected[0] > 0) {
			let products = result.recordsets[0];
			products = await pagination(products, page, limit);
			const category = result2.recordsets[0];
			const max_min = result3.recordsets[0];
			const supplier = result4.recordsets[0];

			res.send({
				products,
				category,
				max_min,
				supplier,
			});
		} else {
			res.status(500).json({
				message: 'No se encontro resultado de los productos del banner',
			});
		}
	} catch (error) {
		console.log('Error: No se pudo consultar los productos del banner ', error);
		res.status(500).json({
			message: 'Problemas al consultar los productos del banner',
		});
	}
};

const getbanners_releases = async (req, res) => {
	try {
		const pool = await getConnection();
		const result = await pool.request().query(tsqlbanners.banners_releases);
		if (result.rowsAffected[0] > 0) {
			const Banners = result.recordsets[0];
			res.send({
				Banners,
			});
		} else {
			res.status(500).json({
				message: 'No se encontro resultado de los lanzamientos',
			});
		}
	} catch (error) {
		console.log('Error: No se pudo consultar los lanzamientos ', error);
		res.status(500).json({
			message: 'Problemas al consultar los lanzamientos',
		});
	}
};

const getproducts_releases = async (req, res) => {
	try {
		const pool = await getConnection();
		const { IdListaPrecios, CodProveedor, page, limit } = req.query;
		const result = await pool
			.request()
			.input('IdListaPrecios', sql.VarChar, IdListaPrecios)
			.input('CodProveedor', sql.VarChar, CodProveedor)
			.query(tsqlbanners.products_new);
		if (result.rowsAffected[0] > 0) {
			let Banners = result.recordsets[0];
			Banners = await pagination(Banners, page, limit);
			res.send({
				Banners,
			});
		} else {
			res.status(500).json({
				message: 'No se encontro resultado de los productos de lanzamiento',
			});
		}
	} catch (error) {
		console.log('Error: No se pudo consultar los productos del lanzamiento ', error);
		res.status(500).json({
			message: 'Problemas al consultar los productos del lanzamiento',
		});
	}
};

module.exports = {
	getbanners,
	getproducts_banners,
	getbanners_releases,
	getproducts_releases,
	getidbanners,
};
