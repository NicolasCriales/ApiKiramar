import { getConnection, sql } from '../database/connection';
import { tsqlorder } from '../tsql';
import { pagination } from '../helpers/pagination';
import { GetToken } from '../helpers/auth/generate-jwt'
import bcryptjs from 'bcryptjs';
import axios from 'axios';
import config from '../config';
import nodemailer from 'nodemailer';




const getMtPedido = async (req, res) => {
	try {
		const pool = await getConnection();
		const FechaGenerada = new Date();
		const Fecha = new Date(FechaGenerada).toLocaleDateString('en-CA');
		const FechaKiramar = Fecha + ' ' + '00:00:00.000';

		const {
			NIT,
			PERSONANJ,
			NOMBRE,
			CODCIUDAD,
			CIUDAD,
			DIRECCION,
			Complemento,
			TELEFONO,
			CELULAR,
			EMAIL,
			BRUTO,
			DESCUENTO,
			TOTALIVA,
			NETO,
			product,
			ListaPrecios,
			PRODUCTO,
			CANTIDAD,
			CANTORIG,
		} = req.body;

		const MtCliente = await pool.request().input('NIT', sql.VarChar, NIT).query(tsqlorder.mtprocli);
		const Cliente = MtCliente.recordsets[0];
		var TipoDocumento = '';
		if (PERSONANJ == 'CC') {
			var TipoDocumento = 1;
		} else {
			var TipoDocumento = 2;
		}

		if (MtCliente.rowsAffected[0] > 0 === true) {
			//console.log('si existe el cliente', Cliente);
		} else {
			// console.log('No existe', Cliente);
			const MtClienteInsert = await pool.request().query(`

			
			insert into MtCliente
		(
			   [IdEmpresa], [Nit], [CodAlterno], [Nombre], [Pais], [CodCiudad], [Ciudad], [Direccion], [Telefono], 
			   [Celular], [Email], [Contacto], [ListaPrecios], [CodVendedor], [Habilitado], [Estado], [Cupo], 
			   [DctoPiePag], [CodTipoCl], [Latitud], [Longitud],[GeoPosCertificada], [Modificado], [CodVenModifica], 
			   [ObsCartera], [password], [PERSONANJ]
		)
		values
		(
				'1', '${NIT}','${NIT}','${NOMBRE}', 'COLOMBIA', '${CODCIUDAD}', '${CIUDAD}', '${DIRECCION}', '${TELEFONO}',
				'${CELULAR}', '${EMAIL}','${CELULAR}', 'WEB', '1034','S', '1', '0',  '0',  '0',  '0', '0','0', '0',  '0',
				'0',  '0', ${TipoDocumento}
		)`);
		}

		const result0 = await pool.request().query(tsqlorder.NRODCTO);
		const nrodcto = result0.recordsets[0];

		var updatenrodcto = nrodcto;
		var TIPODCTO = '';
		var BODEGA = '';
		/*
		if (ListaPrecios === 'PB005') {
			updatenrodcto = updatenrodcto[0].ConsecutPedAPKBq + 1;
			TIPODCTO = 'PB';
			var BODEGA = '2101';
		} else {
			updatenrodcto = updatenrodcto[0].ConsecutPedAPKNq + 1;
			TIPODCTO = 'PM';
			var BODEGA = '1101';
		}
		*/
		if (ListaPrecios === 'PB005'){
			updatenrodcto = updatenrodcto[0].ConsecutPedAPKBq + 1;
			TIPODCTO = 'HB';
			var BODEGA = '2101';
		} else if  ( ListaPrecios ===   'PB003'){
			updatenrodcto = updatenrodcto[0].ConsecutPedAPKNq + 1;
			TIPODCTO = 'HN';
			var BODEGA = '1101';
		} else {
			updatenrodcto = updatenrodcto[0].ConsecutPedAPKCa + 1;
			TIPODCTO = 'HC';
			var BODEGA = '1101';
		}
		console.log(updatenrodcto,BODEGA,TIPODCTO);

		const result = await pool.request().query(
			`insert into MtPedido
			(
				[TIPODCTO], [NRODCTO], [FECHA], [CODVEN], [NIT], [BRUTO], [DESCUENTO], [TOTALIVA], [NETO], [NOTA], 
				[ESTADOPED], [TIPOFAC], [NROFACTURA],[FECHAFACT], [SYNC], [LATITUD], [LONGITUD], [IDCOMPRA], 
				[COMENTARIO], [AUTORIZADOPOR], [SYNCCLOUD], [FECHAING],[Direccion],[Complemento],[Ciudad], [CodCiudad]
			)
			values 
			(
				'${TIPODCTO}',${updatenrodcto},  '${FechaKiramar}', '1052','${NIT}','${BRUTO}','${DESCUENTO}','${TOTALIVA}',
				'${NETO}', '','1','NULL','NULL','${FechaKiramar}','S','0','0','NULL', '',
				'','S','${FechaKiramar}', '${DIRECCION}', '${Complemento}' ,'${CIUDAD}','${CODCIUDAD}'
			)`
		);
		for (let i = 0; i < product.length; i++) { 
			const result2 = await pool
				.request()
				.input('PRODUCTO', product[i].PRODUCTO)
				.input('ListaPrecios', ListaPrecios)
				.query(tsqlorder.infoproduct);
			const Articulo = await result2.recordsets[0][0];

			const result3 = await pool.request().query(
				`insert into  MvPedido
					(
						[TIPODCTO], [NRODCTO], [BODEGA], [PRODUCTO], [CANTIDAD], [CANTORIG], [VALORUNIT], [IVA], 
						[DTOBASE], [DTOPROMO], [CONDCTOPROMO],[DTOAUTORIZADO], [CONDCTOAUTORIZADO], [DTOCCIAL], 
						[CONDCTOCOMERCIAL], [CONIVA], [NETO], [NOTA]
					)
					values
					(
					  '${TIPODCTO}', ${updatenrodcto} ,'${BODEGA}', '${Articulo.IdProducto}', '${product[i].CANTIDAD}', 
					  '${product[i].CANTORIG}', '${Articulo.Valorunit}','${Articulo.IVA}', '${Articulo.DctoBase}', 
					  '${Articulo.DctoPromocional}', '${Articulo.CONDCTOPROMO * product[i].CANTIDAD}','0', 
					  '${Articulo.CONDCTOPROMO * product[i].CANTIDAD}', '${Articulo.DTOCCIAL}',
					  '${Articulo.CONDCTOCOMERCIAL * product[i].CANTIDAD}','${Articulo.CONIVA * product[i].CANTIDAD}', 
					  '${Articulo.NETO * product[i].CANTIDAD}',
					  'COMPRA Kiramar app'
					)`
			);
		}

		if (ListaPrecios === 'PB005') {
			const result4 = await pool.request().query(`update MtConsecutivoTipoDcto set ConsecutPedAPKBq=${updatenrodcto} `);
		} else if (ListaPrecios === 'PB003') {
			const result4 = await pool.request().query(`update MtConsecutivoTipoDcto set ConsecutPedAPKNq=${updatenrodcto} `);
		} else {
			const result4 = await pool.request().query(`update MtConsecutivoTipoDcto set ConsecutPedAPKCa=${updatenrodcto} `);
		}
		console.log('final', updatenrodcto,TIPODCTO);

		res.send({
			Nrodcto: updatenrodcto,
			TIPODCTO: TIPODCTO,
		});
	} catch (error) {
		console.log('Error: Problemas al insertar pedido', error);
		res.status(500).send({
			message: 'Problemas al insertar pedido',
		});
	}
};

const getstatus = async (req, res) => {
	try {

		const pool = await getConnection();
		const { NRODCTO, TIPODCTO, Total } = req.body;
		console.log( 'datos que recibo',NRODCTO, TIPODCTO);
		var FechaActual = new Date().getTime();
		const IdTransaccion =  'xxxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxx'.replace(/[xy]/g,function(c) {
			const aleatorio =(FechaActual + Math.random() * 16) % 16 | 0;
			FechaActual = Math.floor(FechaActual / 16);
			return (c == 'x' ? aleatorio : (aleatorio & 0x3 | 0x8 )).toString(16);
		})

		if (TIPODCTO == 'KC') { 

			const FechaGenerada = new Date();
			const Fecha = new Date(FechaGenerada).toLocaleDateString('en-CA');
			const FechaKiramar = Fecha + ' ' + '00:00:00.000';

			const result0 = await pool
				.request()
				.input('TIPODCTO', TIPODCTO)
				.input('NRODCTO', NRODCTO)
				.query(tsqlorder.facture_detailfech);
			const DataUsername = result0.recordsets[0][0];
			const NitUsername = DataUsername.Nit;
			
			const result = await pool
				.request()
				.input('TIPODCTO', TIPODCTO)
				.input('NRODCTO', NRODCTO)
				.input('NitUsername', NitUsername)
				.input('FechaKiramar', FechaKiramar)
				.input('Total', Total)
				.input('ESTADOPED', '1')
				.input('IdTransaccion', IdTransaccion)
				.query(tsqlorder.factureStatus);

				const result1 = await pool
				.request()
				.input('NitUsername', NitUsername)
				.query(tsqlorder.datoscli);
			const datospago = result1.recordsets[0][0];



			const token = await GetToken()
			const respuesta = await axios({
				method: 'post',
				url: 'https://noccapi.paymentez.com/linktopay/init_order/',
				data:{
					"user": {
						"id": `${IdTransaccion}`,
						"email": `${datospago.Email}`,
						"name": `${datospago.Nombre}`,
						"last_name": `${datospago.Nombre}`
					},
					"order": {
						"dev_reference": "1",
						"description": "Product description",
						"amount": `${Total}`,
						"installments_type": 0,
						"currency": "COP"
					},
					"configuration": {
						"partial_payment": true,
						"expiration_days": 1,
						"allowed_payment_methods": ["All", "Cash", "BankTransfer", "Card", "Qr"],
						"success_url": "https://url-to-success.com",
						"failure_url": "https://url-to-failure.com",
						"pending_url": "https://url-to-pending.com",
						"review_url": "https://url-to-review.com"
					}
				},
				headers: {
					'Auth-Token': `${token}`
				}
			  });

			const data = await respuesta.data
			const urlpago =  data.data.payment.payment_url;


			res.send({
				urlpago: urlpago,
				IdTransaccion,
			});
		} else {
			const result = await pool
				.request()
				.input('IdTransaccion', sql.VarChar, IdTransaccion)
				.input('NRODCTO', sql.VarChar, NRODCTO)
				.input('TIPODCTO', sql.VarChar, TIPODCTO)
				.query(tsqlorder.status);
			console.log('transaccion',IdTransaccion);
			const result2 = await pool
				.request()
				.input('IdTransaccion', sql.VarChar, IdTransaccion)
				.input('NRODCTO', sql.VarChar, NRODCTO)
				.input('TIPODCTO', sql.VarChar, TIPODCTO)
				.query(tsqlorder.datafacture);

				const  DatosFactura = await result2.recordsets[0];
				const token = await GetToken()

				const respuesta = await axios({
					method: 'post',
					url: 'https://noccapi.paymentez.com/linktopay/init_order/',
					data:{
						"user": {
							"id": `${DatosFactura[0].IdTransaccion}`,
							"email": `${DatosFactura[0].Email}`,
							"name": `${DatosFactura[0].Nombre}`,
							"last_name": `${DatosFactura[0].Nombre}`
						},
						"order": {
							"dev_reference": "1",
							"description": "Product description",
							"amount": `${Total}`,
							"installments_type": 0,
							"currency": "COP"
						},
						"configuration": {
							"partial_payment": true,
							"expiration_days": 1,
							"allowed_payment_methods": ["All", "Cash", "BankTransfer", "Card", "Qr"],
							"success_url": "https://url-to-success.com",
							"failure_url": "https://url-to-failure.com",
							"pending_url": "https://url-to-pending.com",
							"review_url": "https://url-to-review.com"
						}
					},
					headers: {
						'Auth-Token': `${token}`
					}
				  });

				const data = await respuesta.data
				const urlpago =  data.data.payment.payment_url;
				console.log('url de pago',urlpago);
				res.send({
					urlpago,
					IdTransaccion
				});
		}
	} catch (error) {
		console.log('Error: Problemas al enviar url de paymentez', error);
		res.status(500).send({
			message: 'Problemas al enviar url de paymentez',
		});
	}
};

const getpayment = async (req, res) => {
	try {
		const pool = await getConnection();
		const { idtransaccion } = req.query;
		//const buscarsigno =  '-'
		//const cambiarsigno = await (idtransaccion.replace(new RegExp(buscarsigno,"g") ,"/"));
		//const validkc =  await bcryptjs.compareSync('KC', cambiarsigno);
		//const TIPODCTO = 'KC';
		const result0 = await pool.request().query(`select  idtransaccion from MtpagoCartera where idtransaccion = '${idtransaccion}' `)

		if (result0.rowsAffected[0] > 0) {
			//console.log(validkc);
			const result = await pool
				.request()
				.input('idtransaccion', idtransaccion)
				.query(tsqlorder.DatosEnviofac);
 
			const result2 = await pool
				.request()
				.input('idtransaccion', idtransaccion)
				.query(tsqlorder.DatosClientefac);

			const result3 = await pool
				.request()
				.input('idtransaccion', idtransaccion)
				.query(tsqlorder.TotalArticulosfac);

			const result4 = await pool
				.request()
				.input('idtransaccion', idtransaccion)
				.query(tsqlorder.DetalleTransacciónfac);

			const DatosEnvio = result.recordsets[0];
			const DatosCliente = result2.recordsets[0];
			const TotalArticulos = result3.recordsets[0];
			const DetalleTransacción = result4.recordsets[0];
			res.send({
				DatosEnvio,
				DatosCliente,
				TotalArticulos,
				DetalleTransacción,
			});
		} else {
			//console.log(validkc);
			const result = await pool.request().input('idtransaccion', idtransaccion).query(tsqlorder.DatosEnvio);

			const result2 = await pool.request().input('idtransaccion', idtransaccion).query(tsqlorder.DatosCliente);

			const result3 = await pool.request().input('idtransaccion', idtransaccion).query(tsqlorder.ArticulosTotal);

			const result4 = await pool.request().input('idtransaccion', idtransaccion).query(tsqlorder.DetalleTransacción);

			const DatosEnvio = result.recordsets[0];
			const DatosCliente = result2.recordsets[0];
			const TotalArticulos = result3.recordsets[0];
			const DetalleTransacción = result4.recordsets[0];

			res.send({
				DatosEnvio,
				DatosCliente,
				TotalArticulos,
				DetalleTransacción,
			});
		}
	} catch (error) {
		console.log('Error: Problemas al consultar datos del pedido', error);
		res.status(500).send({
			message: 'Problemas al consultar datos del pedido',
		});
	}
};

const getPedido = async (req, res) => {
	try {
		const pool = await getConnection();
		const { Nit } = req.query;
		const result = await pool.request().input('Nit', sql.VarChar, Nit).query(tsqlorder.pedido);
		if (result.rowsAffected[0] > 0) {
			const order = result.recordsets[0];
			res.send({
				order,
			});
		} else {
			res.status(200).send({
				message: 'No se encontro ninguna orden asociado al cliente',
			});
		}
	} catch (error) {
		console.log('Error: Problemas al consultar las ordenes del usuario', error);
		res.status(500).send({
			message: 'Problemas al consultar las ordenes del usuario',
		});
	}
};

const getPedidoWEb = async (req, res) => {
	try {
		const pool = await getConnection();
		const { Nit } = req.query;
		const CLienteWeb = `and cliente.ListaPrecios='' `;
		const PedidoWeb = tsqlorder.pedido + CLienteWeb;
		const result = await pool.request().input('Nit', sql.VarChar, Nit).query(PedidoWeb);
		if (result.rowsAffected[0] > 0) {
			const order = result.recordsets[0];
			res.send({
				order,
			});
		} else {
			res.status(200).send({
				message: 'No se encontro ninguna orden asociado al cliente',
			});
		}
	} catch (error) {
		console.log('Error: Problemas al consultar pedidos web btc', error);
		res.status(500).send({
			message: 'Problemas al consultar pedidos web btc',
		});
	}
}; 

const getPedido_detail = async (req, res) => {
	try {
		const pool = await getConnection();
		const { TIPODCTO, NRODCTO, Nit } = req.query;

		const result = await pool
			.request()
			.input('Nit', sql.VarChar, Nit)
			.input('TIPODCTO', sql.VarChar, TIPODCTO)
			.input('NRODCTO', sql.VarChar, NRODCTO)
			.query(tsqlorder.pedido_detail);

		const result2 = await pool
			.request()
			.input('TIPODCTO', sql.VarChar, TIPODCTO)
			.input('NRODCTO', sql.VarChar, NRODCTO)
			.query(tsqlorder.pedido_detail1);

		const result3 = await pool
			.request()
			.input('TIPODCTO', sql.VarChar, TIPODCTO)
			.input('NRODCTO', sql.VarChar, NRODCTO)
			.query(tsqlorder.ArticulosTotal2);

		if (result.rowsAffected[0] > 0) {
			const orders = result.recordsets[0];
			const Articulos = result2.recordsets[0];
			const ContadorArt = result3.recordsets[0];

			res.send({
				orders,
				Articulos,
				ContadorArt,
			});
		} else {
			res.status(200).send({
				message: 'No se encontro ninguna orden asociado al cliente',
			});
		}
	} catch (error) {
		console.log('Error: Problemas al consultar detalles del pedido', error);
		res.status(500).send({
			message: 'Problemas al consultar detalles del pedido',
		});
	}
};


const getfacture_orderb2b = async (req, res) => {
	try {
		const pool = await getConnection();
		const { Nit, page, limit } = req.query;
		const result = await pool.request().input('Nit', sql.VarChar, Nit).query(tsqlorder.orderb2b);
		if (result.rowsAffected[0] > 0) {
			let order = result.recordsets[0];
			order = await pagination(order, page, limit);
			res.send({
				order,
			});
		} else {
			res.status(200).send({
				message: 'No se encontro ninguna orden asociado al cliente',
			});
		}
	} catch (error) {
		console.log('Error: Problemas al consultar orden ', error);
		res.status(500).send({
			message: 'Problemas al consultar orden',
		});
	}
};

const getfacture_detailb2b = async (req, res) => {
	try {
		const pool = await getConnection();
		const { Tipodcto, Nrodcto } = req.query;
		const result = await pool
			.request()
			.input('Tipodcto', sql.VarChar, Tipodcto)
			.input('Nrodcto', sql.VarChar, Nrodcto)
			.query(tsqlorder.factureb2b);

		const result2 = await pool
			.request()
			.input('Tipodcto', sql.VarChar, Tipodcto)
			.input('Nrodcto', sql.VarChar, Nrodcto)
			.query(tsqlorder.facture_detailfech);

		const result3 = await pool
			.request()
			.input('Tipodcto', sql.VarChar, Tipodcto)
			.input('Nrodcto', sql.VarChar, Nrodcto)
			.query(tsqlorder.ArticulosTotalb2b);

		if (result.rowsAffected[0] > 0) {
			const Articulos = result.recordsets[0];
			const date = result2.recordsets[0];
			const ContadorArt = result3.recordsets[0];
			const TotalAbonado = result3.recordsets[0][0].Neto - result2.recordsets[0][0].deuda;

			res.send({
				date,
				ContadorArt,
				TotalAbonado,
				Articulos,
			});
		} else {
			res.status(200).send({
				message: 'No se encuentra la factura seleccionada',
			});
		}
	} catch (error) {
		console.log('Error: Problemas detalles de una orden', error);
		res.status(500).send({
			message: 'Problemas detalles de una orden',
		});
	}
};



//preguntar si utilizan 
const getfacture_status = async (req, res) => {
	try {
		const pool = await getConnection();
		const { TipoDcto, NroDcto, Valor } = req.body;
		const salt = bcryptjs.genSaltSync(int);
		const IdTransaccion = bcryptjs.hashSync(NroDcto, salt);
		const FechaGenerada = new Date();
		const Fecha = new Date(FechaGenerada).toLocaleDateString('en-CA');
		const FechaKiramar = Fecha + ' ' + '00:00:00.000';
		const result = await pool
			.request()
			.input('TipoDcto', TipoDcto)
			.input('NroDcto', NroDcto)
			.input('Valor', Valor)
			.input('IdTransaccion', IdTransaccion)
			.query(tsqlorder.factureStatus);
		const urlpago = 'www.google.com.co';
		res.send({
			urlpago: urlpago,
			IdTransaccion,
		});
	} catch (error) {
		console.log('Error: no se encontro la factura enviada', error);
		res.status(500).send({
			message: 'Problemas al consultar la factura',
		});
	}
};


const getPedido_response = async (req,res) => {
	try {
		const pool = await getConnection()
		const data = req.body

		const Aprovado = 1
		const cancelado = 2
		const Rechazada = 4
		const Expirada = 5
		var payment_method_type = ''

		if (data.transaction.payment_method_type == 0) {
			var payment_method_type = 'Tarjeta de crédito'
		} if (data.transaction.payment_method_type == 1) {
			var payment_method_type = 'Boleto '
		} if (data.transaction.payment_method_type == 3) {
			var payment_method_type = 'monedero electrónico'
		} if (data.transaction.payment_method_type == 5) {
			var payment_method_type = 'Tarjeta de vales'
		} if (data.transaction.payment_method_type == 6) {
			var payment_method_type = 'Transferencia bancaria'
		} if (data.transaction.payment_method_type == 7) {
			var payment_method_type = 'Tarjeta de débito'
		} if (data.transaction.payment_method_type == 7) {
			var payment_method_type = 'Tarjeta de prepago'
		}


		const paymentez = await pool.request().query(`
			insert into paymentez
			(
				[status], [bank_name], [order_description], [payment_method_type], [authorization_code], [application_code],
				[dev_reference], [bank_code], [status_detail], [terminal_code], [amount], [paid_date], [pse_cycle], [date],
				[stoken], [id_paymentez], [ltp_id], [email], [idtransaccion], [fiscal_number]
		  	)
			values
			(
				'${data.transaction.status}', '${data.transaction.bank_name}', '${data.transaction.order_description}', '${data.transaction.payment_method_type}', '${data.transaction.authorization_code}', '${data.transaction.application_code}',
				'${data.transaction.dev_reference}','${data.transaction.bank_code}', '${data.transaction.status_detail}', '${data.transaction.terminal_code}', '${data.transaction.amount}', '${data.transaction.paid_date}', '${data.transaction.pse_cycle}', '${data.transaction.date}',
				'${data.transaction.stoken}', '${data.transaction.id}', '${data.transaction.ltp_id}','${data.user.email}', '${data.user.id}','${data.user.fiscal_number}'
			)
		`)

		const result0 = await pool.request().query(`select  idtransaccion from MtpagoCartera where idtransaccion = '${data.user.id}' `)


		if(result0.rowsAffected[0] > 0) {
			if( data.transaction.status == 1 ) {
				//Aprovado
				const resul = await pool
					.request()
					.query(`update MtpagoCartera set estado = 1, EstadoTransaccion='Aprobado', MetodoPago='${payment_method_type}', Motivo='Aprobado' where idtransaccion = '${data.user.id}' `)
			} 
	
			if( data.transaction.status == 2 ) {
				//cancelado
				const resul = await pool
					.request()
					.query(`update MtpagoCartera set estado = 6, EstadoTransaccion='Rechazado', MetodoPago='${payment_method_type}', Motivo='Rechazado' where IdTransaccion = '${data.user.id}' `)
			} 
	
			if( data.transaction.status == 4 ) {
				//Rechazada
				const resul = await pool
					.request()
					.query(`update MtpagoCartera set estado = 3, EstadoTransaccion='Rechazado', MetodoPago='${payment_method_type}', Motivo='Rechazado' where IdTransaccion = '${data.user.id}' `)
			} 
	
			if( data.transaction.status == 5 ) {
				//Expirada
				const resul = await pool
					.request()
					.query(`update MtpagoCartera set estado = 6, EstadoTransaccion='Rechazado', MetodoPago='${payment_method_type}', Motivo='Rechazado' where IdTransaccion = '${data.user.id}' `)
				
			} 

			const transporter = nodemailer.createTransport({
				host: 'smtp-mail.outlook.com',
				port: 587,
				secure: false, // verdadero para 587, falso para otros puertos
				auth: {
					user: config.CORREO_EMAIL, //correo etérea generada
					pass: config.CORREO_CONTRASENA, //contraseña etérea generada
				},
			});
			// enviar correo con objeto de transporte definido
			const mailoption = {
				from: config.CORREO_EMAIL, // dirección del remitente
				to: 'dircartera@kiramar.com.co', //lista de receptores
				subject: 'Factura Realizado', //Línea de asunto
				text: `Numero de Identificacion: ${data.transaction.id}`,
				html: `<p>Numero de Identificacion: ${data.transaction.id}</p><br>
					   <p>Cedula: ${data.user.fiscal_number}</p><br>	
					   <p>Correo: ${data.user.email}</p><br>
					   <p>Estado: ${data.transaction.status}</p><br>
					   <p>Metodo pago: ${payment_method_type}</p>`
			};
			transporter.sendMail(mailoption, (err, result) => {
				if (err) {
					res.status(500).send(err.message);
				} else {
					console.log('Email enviado');
					res.status(200).json(req.body);
				}
			});


		} else {
			if( data.transaction.status == 1 ) {
				//Aprovado
				const resul = await pool
					.request()
					.query(`update MtPedido set ESTADOPED = 1, EstadoTransaccion='Aprobado', NOTA='Aprobado por el banco ID_transaccion: ${data.transaction.id}' where IdTransaccion = '${data.user.id}' `)
			} 
	
			if( data.transaction.status == 2 ) {
				//cancelado
				const resul = await pool
					.request()
					.query(`update MtPedido set ESTADOPED = 6, EstadoTransaccion='Rechazado', NOTA='Cancelado por el banco ID_transaccion: ${data.transaction.id}' where IdTransaccion = '${data.user.id}' `)
			} 
	
			if( data.transaction.status == 4 ) {
				//Rechazada
				const resul = await pool
					.request()
					.query(`update MtPedido set ESTADOPED = 3, EstadoTransaccion='Rechazado',NOTA='Rechazado por el banco ID_transaccion: ${data.transaction.id}' where IdTransaccion = '${data.user.id}' `)
			} 
	
			if( data.transaction.status == 5 ) {
				//Expirada
				const resul = await pool
					.request()
					.query(`update MtPedido set ESTADOPED = 6, EstadoTransaccion='Rechazado', NOTA='Expirado por el banco ID_transaccion:  ${data.transaction.id}' where IdTransaccion = '${data.user.id}' `)
			}


			const transporter = nodemailer.createTransport({
				host: 'smtp-mail.outlook.com',
				port: 587,
				secure: false, // verdadero para 587, falso para otros puertos
				auth: {
					user: config.CORREO_EMAIL, //correo etérea generada
					pass: config.CORREO_CONTRASENA, //contraseña etérea generada
				},
			});
			// enviar correo con objeto de transporte definido
			const mailoption = {
				from: config.CORREO_EMAIL, // dirección del remitente
				to: `serclientenq2@kiramar.com.co`, //lista de receptores
				subject: 'Pedido Realizado', //Línea de asunto
				text: `Numero de Identificacion: ${data.transaction.id}`,
				html: `<p>Numero de Identificacion: ${data.transaction.id}</p><br>
					   <p>Cedula: ${data.user.fiscal_number}</p><br>	
					   <p>Correo: ${data.user.email}</p><br>
					   <p>Estado: ${data.transaction.status}</p><br>
					   <p>Metodo pago: ${payment_method_type}</p>`
					    //cuerpo de texto sin formato
			};
			transporter.sendMail(mailoption, (err, result) => {
				if (err) {
					res.status(500).send(err.message);
				} else {
					console.log('Email enviado');
					res.status(200).json(req.body);
				}
			});
		}
		
		res.send({
			Data: data
		})
		console.log('Estos datos',data);
	} catch (error) {
			res.status(500).json({
				error: 'al insertar datos paymentes Error:',
			});
			
	}
}


module.exports = {
	getMtPedido,
	getPedido,
	getPedidoWEb,
	getPedido_detail,
	getfacture_orderb2b,
	getfacture_detailb2b,
	getstatus,
	getpayment,
	getfacture_status,
	getPedido_response,
	
};
