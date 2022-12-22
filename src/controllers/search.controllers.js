import { getConnection, sql } from '../database/connection';
import { tsqlsearch } from '../tsql';
import { pagination } from '../helpers/pagination';

const getsearch = async (req, res) => {
	try {
		const pool = await getConnection();
		const { IdListaPrecios,
				buscar, 
				CodProveedor, 
				category, 
				orderP, 
				orderF, 
				preciomin, 
				preciomax, 
				page, 
				limit 
			} = req.query;
		if (CodProveedor ==  1004) {
			var addcodsumin = ` and MTA.NombreProveedor='Dkasa' ) as AUX `;
		}  else {
			if (CodProveedor.length != 0) {
				var addcodsumin = `and PROV.codsumin in (${CodProveedor})  ) as AUX `;
			} else {
				var addcodsumin = `) as AUX `;
			}
		}

		if (category.length != 0) {
			var addcategory = `and  mta.CodSubLinea in (${category})`;
		} else {
			var addcategory = ``;
		}

		/*if (CodProveedor.length != 0) {
			var addcodsumin = `and PROV.codsumin in (${CodProveedor})  ) as AUX `;
		} else {
			var addcodsumin = `) as AUX `;
		}*/

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
		//MOSTRAMOS TODOS LOS PRODUCTOS DE LA BUSQUEDA
		var sql_search = tsqlsearch.search + addcategory + addcodsumin + filterprice + addorderP + addorderF;
		//console.log(sql_search);
		const result = await pool
			.request()
			.input('IdListaPrecios', sql.VarChar, IdListaPrecios)
			.input('buscar', sql.VarChar, '%' + buscar + '%')
			.query(sql_search);

		//MOSTRAMOS TODOS LOS PRODUCTOS DE LA BUSQUEDA Y FILTRO PROVEEDOR
		//var sql_supplier = tsqlsearch.supplier + addcategory + addcodsumin
		const result2 = await pool
			.request()
			.input('IdListaPrecios', sql.VarChar, IdListaPrecios)
			.input('buscar', sql.VarChar, '%' + buscar + '%')
			.query(tsqlsearch.supplier);

		//MOSTRAMOS TODOS LOS PRODUCTOS DE LA BUSQUEDA Y FILTRO CATEGORIA
		//var sql_category = tsqlsearch.category + addcategory + addcodsumin
		const result3 = await pool
			.request()
			.input('IdListaPrecios', sql.VarChar, IdListaPrecios)
			.input('buscar', sql.VarChar, '%' + buscar + '%')
			.input('CodProveedor', sql.VarChar, '%' + CodProveedor + '%' )
			.query(tsqlsearch.category);

		//MOSTRAMOS TODOS LOS PRODUCTOS DE LA BUSQUEDA Y FILTRO DE PRECIO
		var sql_max_min = tsqlsearch.max_min + addcategory + addcodsumin;
		const result4 = await pool
			.request()
			.input('IdListaPrecios', sql.VarChar, IdListaPrecios)
			.input('buscar', sql.VarChar, '%' + buscar + '%')
			.query(sql_max_min);

		if (result.rowsAffected[0] > 0) {
			let search = result.recordsets[0];
			search = await pagination(search, page, limit);
			const supplier = result2.recordsets[0];
			const category = result3.recordsets[0];
			const max_min = result4.recordsets[0];

			res.send({
				search,
				supplier,
				category,
				max_min,
			});
		} else {
			res.status(200).json({
				message: 'No se encontro el producto',
			});
		}
	} catch (error) {
		console.log('Error: Problemas al encontrar producto', error);
		res.status(500).json({
			message: 'Problemas al encontrar producto',
		});
	}
};

const getsearchautocomplete = async (req, res) => {
	try {
		const pool = await getConnection();
		const { autocomplete } = req.query;
		const result = await pool
			.request()
			.input('autocomplete', sql.VarChar, autocomplete + '%')
			.query(tsqlsearch.searchautocomplete);
		if (result.rowsAffected[0] > 0) {
			const searchautocomplete = result.recordsets[0];
			res.send({
				searchautocomplete,
			});
		} else {
			res.status(200).json({
				message: 'No se encontro el producto',
			});
		}
	} catch (error) {
		console.log('Error: Problemas al consultar el producto', error);
		res.status(500).json({
			message: 'Problemas al consultar el producto',
		});
	}
};

module.exports = {
	getsearch,
	getsearchautocomplete,
};
