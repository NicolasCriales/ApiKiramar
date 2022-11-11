import { getConnection, sql } from '../database/connection';
import { tsqlorder } from '../tsql';
import { pagination } from '../helpers/pagination';
import bcryptjs from 'bcryptjs';
import { Numeric } from 'mssql';

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
		if (ListaPrecios === 'PB005') {
			updatenrodcto = updatenrodcto[0].ConsecutPedAPKBq + 1;
			TIPODCTO = 'PB';
			var BODEGA = '2101';
		} else {
			updatenrodcto = updatenrodcto[0].ConsecutPedAPKNq + 1;
			TIPODCTO = 'PM';
			var BODEGA = '1101';
		}

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
                '${NETO}', 'COMPRA Kiramar app','1','NULL','NULL','${FechaKiramar}','S','0','0','NULL', 'COMPRA APK',
                'NCRIALES','S','${FechaKiramar}', '${DIRECCION}', '${Complemento}' ,'${CIUDAD}','${CODCIUDAD}'
            )`
		);
		for (let i = 0; i < product.length; i++) {
			const result2 = await pool
				.request()
				.input('PRODUCTO', product[i].PRODUCTO)
				.input('NIT', NIT)
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
		} else {
			const result4 = await pool.request().query(`update MtConsecutivoTipoDcto set ConsecutPedAPKNq=${updatenrodcto} `);
		}

		res.send({
			Nrodcto: updatenrodcto,
			TIPODCTO: TIPODCTO,
		});
	} catch (error) {
		console.log('Error: no se pudo consultar las ordenes del usuario ', error);
		res.status(500).send({
			message: 'Problemas al consultar las ordenes del usuario',
		});
	}
};

const getstatus = async (req, res) => {
	try {

		const pool = await getConnection();
		const { NRODCTO, status, TIPODCTO, Total } = req.body;
		const salt = await  bcryptjs.genSaltSync(0);
		const Encriptar = await bcryptjs.hashSync(TIPODCTO);
		const buscar = '/'
		const IdTransaccion = await (Encriptar.replace(new RegExp(buscar,"g") ,"-"));
		//const IdTransaccion =  await bcryptjs.hashSync(TIPODCTO);
		var ESTADOPED = 1;
		if (status === 200) {
			ESTADOPED = 2;
		} else {
			ESTADOPED = 2;
		}
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
				.input('ESTADOPED', ESTADOPED)
				.input('IdTransaccion', IdTransaccion)
				.query(tsqlorder.factureStatus);
			const urlpago = 'www.google.com.co';
			res.send({
				urlpago: urlpago,
				IdTransaccion,
			});
		} else {
			const result = await pool
				.request()
				.input('IdTransaccion', sql.VarChar, IdTransaccion)
				.input('NRODCTO', sql.VarChar, NRODCTO)
				.input('ESTADOPED', sql.Numeric, ESTADOPED)
				.input('TIPODCTO', sql.VarChar, TIPODCTO)
				.query(tsqlorder.status);

			if (result.rowsAffected[0] > 0) {
				const updateStatus = result.recordsets[0];
				const urlpago = 'www.google.com.co';
				const validPassword = bcryptjs.compareSync('PM', IdTransaccion);
				res.send({
					validPassword,
					urlpago: urlpago,
					IdTransaccion: IdTransaccion,
				});
			} else {
				res.status(500).send({
					message: 'No se encontro ninguna orden asociado al cliente',
				});
			}
		}
	} catch (error) {
		console.log('Error: no se pudo consultar las ordenes del usuario ', error);
		res.status(500).send({
			message: 'Problemas al consultar las ordenes del usuario',
		});
	}
};

const getpayment = async (req, res) => {
	try {
		const pool = await getConnection();
		const { idtransaccion } = req.query;
		const buscarsigno =  '-'
		const cambiarsigno = await (idtransaccion.replace(new RegExp(buscarsigno,"g") ,"/"));
		const validkc =  await bcryptjs.compareSync('KC', cambiarsigno);
		const TIPODCTO = 'KC';
		if (validkc) {
			console.log(validkc);
			const result = await pool
				.request()
				.input('TIPODCTO', TIPODCTO)
				.input('idtransaccion', idtransaccion)
				.query(tsqlorder.DatosEnviofac);
 
			const result2 = await pool
				.request()
				.input('TIPODCTO', TIPODCTO)
				.input('idtransaccion', idtransaccion)
				.query(tsqlorder.DatosClientefac);

			const result3 = await pool
				.request()
				.input('TIPODCTO', TIPODCTO)
				.input('idtransaccion', idtransaccion)
				.query(tsqlorder.TotalArticulosfac);

			const result4 = await pool
				.request()
				.input('TIPODCTO', TIPODCTO)
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
			console.log(validkc);
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
		console.log('Error: no se pudo consultar las ordenes del usuario ', error);
		res.status(500).send({
			message: 'Problemas al consultar las ordenes del usuario',
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
			res.status(500).send({
				message: 'No se encontro ninguna orden asociado al cliente',
			});
		}
	} catch (error) {
		console.log('Error: no se pudo consultar las ordenes del usuario ', error);
		res.status(500).send({
			message: 'Problemas al consultar las ordenes del usuario',
		});
	}
};

const getPedidoWEb = async (req, res) => {
	try {
		const pool = await getConnection();
		const { Nit } = req.query;
		const CLienteWeb = `and cliente.ListaPrecios='web' `;
		const PedidoWeb = tsqlorder.pedido + CLienteWeb;
		console.log(PedidoWeb);
		const result = await pool.request().input('Nit', sql.VarChar, Nit).query(PedidoWeb);
		if (result.rowsAffected[0] > 0) {
			const order = result.recordsets[0];
			res.send({
				order,
			});
		} else {
			res.status(500).send({
				message: 'No se encontro ninguna orden asociado al cliente',
			});
		}
	} catch (error) {
		console.log('Error: no se pudo consultar las ordenes del usuario ', error);
		res.status(500).send({
			message: 'Problemas al consultar las ordenes del usuario',
		});
	}
}; //

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
			res.status(500).send({
				message: 'No se encontro ninguna orden asociado al cliente',
			});
		}
	} catch (error) {
		console.log('Error: no se pudo consultar las ordenes del usuario ', error);
		res.status(500).send({
			message: 'Problemas al consultar las ordenes del usuario',
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
			res.status(500).send({
				message: 'No se encontro ninguna orden asociado al cliente',
			});
		}
	} catch (error) {
		console.log('Error: no se pudo consultar las ordenes del usuario ', error);
		res.status(500).send({
			message: 'Problemas al consultar las ordenes del usuario',
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
			res.status(500).send({
				message: 'No se encuentra la factura seleccionada',
			});
		}
	} catch (error) {
		console.log('Error: no se encontro la factura enviada', error);
		res.status(500).send({
			message: 'Problemas al consultar la factura',
		});
	}
};

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
};
