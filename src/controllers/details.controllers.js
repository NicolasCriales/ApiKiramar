import { getConnection, sql } from '../database/connection';
import { tsqldetails } from '../tsql';
import { pagination } from '../helpers/pagination';
import { tsqllogin } from './../tsql/login.tsql';

const getdatasheet = async (req, res) => {
	try {
		const pool = await getConnection();
		const { IdArticulo } = req.query;
		const result = await pool.request().input('IdArticulo', sql.VarChar, IdArticulo).query(tsqldetails.datasheet);

		if (result.rowsAffected[0] > 0) {
			const datasheet = result.recordsets[0];
			res.send({
				datasheet,
			});
		} else {
			res.status(401).json({
				message: 'No se encontro ficha tecnica',
			});
		}
	} catch (error) {
		console.log('Error: Problemas al consultar la ficha tecnica', error);
		res.status(500).json({
			message: 'Problemas al consultar la ficha tecnica',
		});
	}
};

const gettypePQRS = async (req, res) => {
	try {
		const pool = await getConnection();
		const result = await pool.request().query(tsqldetails.typePQRS);

		if (result.rowsAffected[0] > 0) {
			const typePQRS = result.recordsets[0];
			res.send({
				typePQRS,
			});
		} else {
			res.status(401).json({
				Message: 'no se encontro pqrs',
			});
		}
	} catch (error) {
		console.log('Error:Problemas al consultar tipó PQRS', error);
		res.status(500).json({
			message: 'Problemas al consultar tipó PQRS',
		});
	}
};

const getregisterPQRS = async (req, res) => {
	try {
		const pool = await getConnection();
		const FechaGenerada = new Date();
		const Fecha = new Date(FechaGenerada).toLocaleDateString('en-CA');
		const FechaKiramar = Fecha + ' ' + '00:00:00.000';
		const { tipoPqrs, motivo, Nit } = req.body;

		const result = await pool
			.request()
			.input('tipoPqrs', sql.Int, tipoPqrs)
			.input('motivo', sql.NVarChar, motivo)
			.input('Nit', sql.NVarChar, Nit)
			.input('FechaKiramar', FechaKiramar)
			.query(tsqldetails.registerPQRS);
		res.send({
			registerPQRS: 'Le responderemos pronto',
		});
	} catch (error) {
		console.log('Error: Problemas al registrar la pqr', error);
		res.status(500).json({
			message: 'Problemas al registrar la pqrs',
		});
	}
};

const getresponsePQRS = async (req, res) => {
	try {
		const pool = await getConnection();
		const FechaGenerada = new Date();
		const Fecha = new Date(FechaGenerada).toLocaleDateString('en-CA');
		const FechaKiramar = Fecha + ' ' + '00:00:00.000';
		const { id, Nit, respuesta, responsable } = req.body;

		const result = await pool
			.request()
			.input('id', sql.Int, id)
			.input('Nit', sql.VarChar, Nit)
			.input('respuesta', sql.VarChar, respuesta)
			.input('responsable', responsable)
			.input('FechaKiramar', FechaKiramar)
			.query(tsqldetails.responsePQRS);
		res.send({
			responsePQRS: 'Se guardo su respuesta',
		});
	} catch (error) {
		console.log('Error: Problemas al guardar la PQRS', error);
		res.status(500).json({
			message: 'Problemas al guardar la PQRS',
		});
	}
};

const getPQRS = async (req, res) => {
	try {
		const pool = await getConnection();
		const { Nit, page, limit } = req.query;
		const result = await pool.request().input('Nit', sql.VarChar, Nit).query(tsqldetails.PQRS);

		if (result.rowsAffected[0] > 0) {
			let PQRS = result.recordsets[0];
			PQRS = await pagination(PQRS, page, limit);
			res.send({
				PQRS,
			});
		} else {
			res.status(401).query({
				message: 'Este cliente no tiene PQRS',
			});
		}
	} catch (error) {
		console.log('Error: Problemas al consultar pqrs', error);
		res.status(500).json({
			message: 'Problemas al consultar pqrs',
		});
	}
};

const getidPQRS = async (req, res) => {
	try {
		const pool = await getConnection();
		const { Nit, id } = req.query;

		const result = await pool
			.request()
			.input('Nit', sql.VarChar, Nit)
			.input('id', sql.VarChar, id)
			.query(tsqldetails.idPQRS);

		const result2 = await pool
			.request()
			.input('Nit', sql.VarChar, Nit)
			.input('id', sql.VarChar, id)
			.query(tsqldetails.idresponse);

		if (result.rowsAffected[0] > 0) {
			const idPQRS = result.recordsets[0];
			const idresponse = result2.recordsets[0];
			res.send({
				idPQRS,
				idresponse,
			});
		} else {
			res.status(401).query({
				message: 'Este cliente no tiene id de PQRS',
			});
		}
	} catch (error) {
		console.log('Error: Problemas al consultar el id del pqrs', error);
		res.status(500).json({
			message: 'Problemas al consultar el id del pqrs',
		});
	}
};

const getVericationReview = async (req, res) => {
	try {
		const pool = await getConnection();
		const { Nit, idproducto } = req.query;

		const result = await pool
			.request()
			.input('Nit', sql.VarChar, Nit)
			.input('idproducto', sql.VarChar, idproducto)
			.query(tsqldetails.existreview);

		if (result.rowsAffected[0] > 0) {
			const result2 = await pool.request().input('idproducto', sql.VarChar, idproducto).query(tsqldetails.review);
			const review = result2.recordsets[0];
			res.send({
				review: review,
			});
		} else {
			res.status(401).json({
				message: 'no tiene reseña',
			});
		}
	} catch (error) {
		console.log('Error: Problemas al consultar las reseñas', error);
		res.status(500).json({
			message: 'Problemas al consultar las reseñas',
		});
	}
};
const getregisterReview = async (req, res) => {
	try {
		const pool = await getConnection();
		const { Nit, idproducto, calificacion, opinion } = req.body;

		const result = await pool
			.request()
			.input('Nit', sql.VarChar, Nit)
			.input('idproducto', sql.VarChar, idproducto)
			.query(tsqldetails.existreview);
		const result1 = await pool.request().input('Nit', sql.VarChar, Nit).query(tsqllogin.verify);
		const NombreCli = result1.recordsets[0][0].Nombre;

		if (result.rowsAffected[0] > 0) {
			res.status(401).json({
				message: 'Ya tiene una reseña registrada',
			});
		} else {
			const result2 = await pool
				.request()
				.input('Nit', sql.VarChar, Nit)
				.input('idproducto', sql.VarChar, idproducto)
				.input('calificacion', calificacion)
				.input('opinion', sql.VarChar, opinion)
				.input('NombreCli', sql.VarChar, NombreCli)
				.query(tsqldetails.registerReview);
			res.send({
				registerReview: 'la review se guardo',
			});
		}
	} catch (error) {
		console.log('Error: Problemas al consultar reseña registrada', error);
		res.status(500).json({
			message: 'Problemas al consultar reseña registrada',
		});
	}
};

const getreview = async (req, res) => {
	try {
		const pool = await getConnection();
		const { idproducto, page, limit } = req.query;
		const result = await pool.request().input('idproducto', sql.VarChar, idproducto).query(tsqldetails.review);

		if (result.rowsAffected[0] > 0) {
			let review = result.recordsets[0];
			review = await pagination(review, page, limit);
			res.send({
				review,
			});
		} else {
			res.status(401).json({
				message: 'No hay reseñas',
			});
		}
	} catch (error) {
		console.log('Error: Problemas no hay reseña', error);
		res.status(500).json({
			message: 'Problemas no hay reseña',
		});
	}
};

module.exports = {
	getdatasheet,
	gettypePQRS,
	getregisterPQRS,
	getresponsePQRS,
	getPQRS,
	getidPQRS,
	getVericationReview,
	getregisterReview,
	getreview,
};
