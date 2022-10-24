import { getConnection, sql } from "../database/connection";
import { tsqlorder } from "../tsql";
import { pagination } from '../helpers/pagination'


const getMtPedido = async (req, res) => {
    try {
        const pool = await getConnection();
        const FechaGenerada = new Date();
        const Fecha = new Date(FechaGenerada).toLocaleDateString("en-CA");
        const FechaKiramar = Fecha + " " + "00:00:00.000";

        const {
            NIT,
            NOMBRE,
            CODCIUDAD,
            CIUDAD,
            DIRECCION,
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
            VALORUNIT,
            IVA,
            DTOBASE,
            DTOPROMO,
            CONDCTOPROMO,
            DTOAUTORIZADO,
            CONDCTOAUTORIZADO,
            DTOCCIAL,
            CONDCTOCOMERCIAL,
            CONIVA,
            MVNETO,
        } = req.body;

        const MtCliente = await pool.request().input("NIT", sql.VarChar, NIT).query(tsqlorder.mtprocli); 
        const Cliente = MtCliente.recordsets[0] 

        if ( MtCliente.rowsAffected[0] > 0 ===true )  {
            console.log('si existe el cliente', Cliente);

        } else {
            console.log('No existe', Cliente);
            const MtClienteInsert = await pool.request().query(`

            
            insert into MtCliente
        (
        	   [IdEmpresa], [Nit], [CodAlterno], [Nombre], [Pais], [CodCiudad], [Ciudad], [Direccion], [Telefono], [Celular], [Email],
        	   [Contacto], [ListaPrecios], [CodVendedor], [Habilitado], [Estado], [Cupo], [DctoPiePag], [CodTipoCl], [Latitud], [Longitud],
        	   [GeoPosCertificada], [Modificado], [CodVenModifica], [ObsCartera], [password]
        )
        values
        (
        	   '1', '${NIT}','${NIT}','${NOMBRE}', 'COLOMBIA', '${CODCIUDAD}', '${CIUDAD}', '${DIRECCION}', '${TELEFONO}', '${CELULAR}', '${EMAIL}',
        	   '${CELULAR}', 'WEB', '1034','S', '1', '0',  '0',  '0',  '0', '0',
               '0', '0',  '0',  '0',  '0'
        )`

) }

        const result0 = await pool.request().query(tsqlorder.NRODCTO);
        const nrodcto = result0.recordsets[0];

        var updatenrodcto = nrodcto;
        var TIPODCTO = "";
        var BODEGA = ''
        if (ListaPrecios === 'PB005') {
            updatenrodcto = updatenrodcto[0].ConsecutPedAPKBq + 1;
            TIPODCTO = "PB";
            var BODEGA = '2101'

        } else {
            updatenrodcto = updatenrodcto[0].ConsecutPedAPKNq + 1;
            TIPODCTO = "PM";
            var BODEGA = '1101'
        }

        const result = await pool.request().query(
            `insert into MtPedido
            (
                [TIPODCTO], [NRODCTO], [FECHA], [CODVEN], [NIT], [BRUTO], [DESCUENTO], [TOTALIVA], [NETO], [NOTA], [ESTADOPED], [TIPOFAC], [NROFACTURA],
                [FECHAFACT], [SYNC], [LATITUD], [LONGITUD], [IDCOMPRA], [COMENTARIO], [AUTORIZADOPOR], [SYNCCLOUD], [FECHAING],[Direccion],[Ciudad], [CodCiudad]
            )
            values 
            (
                '${TIPODCTO}',${updatenrodcto},  '${FechaKiramar}', '1052','${NIT}','${BRUTO}','${DESCUENTO}','${TOTALIVA}', '${NETO}', 'COMPRA Kiramar app',
                '1','NULL','NULL','${FechaKiramar}','S','0','0','NULL', 'COMPRA APK','NCRIALES','S','${FechaKiramar}', '${DIRECCION}','${CIUDAD}','${CODCIUDAD}'
            )`
        );
        for (let i = 0; i < product.length; i++) {
            const result2 = await pool.request().query(
                `insert into  MvPedido
                    (
                        [TIPODCTO], [NRODCTO], [BODEGA], [PRODUCTO], [CANTIDAD], [CANTORIG], [VALORUNIT], [IVA], [DTOBASE], [DTOPROMO], [CONDCTOPROMO],
                        [DTOAUTORIZADO], [CONDCTOAUTORIZADO], [DTOCCIAL], [CONDCTOCOMERCIAL], [CONIVA], [NETO], [NOTA]
                    )
                    values
                    (
                      '${TIPODCTO}', ${updatenrodcto} ,'${BODEGA}', '${product[i].PRODUCTO}', '${product[i].CANTIDAD}', '${product[i].CANTORIG}', '${product[i].VALORUNIT}',
                      '${product[i].IVA}', '${product[i].DTOBASE}', '${product[i].DTOPROMO}', '${product[i].CONDCTOPROMO}','${product[i].DTOAUTORIZADO}', 
                      '${product[i].CONDCTOAUTORIZADO}', '${product[i].DTOCCIAL}','${product[i].CONDCTOCOMERCIAL}','${product[i].CONIVA}', '${product[i].MVNETO}',
                      'COMPRA Kiramar app'
                    )`
            );
        }

        if (ListaPrecios === 'PB005') {
            const result3 = await pool
                .request()
                .query(
                    `update MtConsecutivoTipoDcto set ConsecutPedAPKBq=${updatenrodcto} `
                );
        } else {
            const result3 = await pool
                .request()
                .query(
                    `update MtConsecutivoTipoDcto set ConsecutPedAPKNq=${updatenrodcto} `
                );
        }

        res.send({
            Nrodcto: updatenrodcto,
            TIPODCTO: TIPODCTO
        });
    } catch (error) {
        console.log("Error: no se pudo consultar las ordenes del usuario ", error);
        res.status(500).send({
            message: "Problemas al consultar las ordenes del usuario",
        });
    }
};

const getstatus = async (req, res) => {
    try {
        const pool = await getConnection();
        const { NRODCTO, status,TIPODCTO } = req.body;
        var ESTADOPED = 1;
        if (status === 200) {
            ESTADOPED = 2;
        } else {
            ESTADOPED = 3;
        }
        const result = await pool
            .request()
            .input("NRODCTO", sql.VarChar, NRODCTO)
            .input("ESTADOPED", sql.Numeric, ESTADOPED)
            .input("TIPODCTO", sql.VarChar, TIPODCTO)
            .query(tsqlorder.status);
        if (result.rowsAffected[0] > 0) {
            const updateStatus = result.recordsets[0];
            const urlpago = 'www.google.com.co'
            res.send({
                urlpago: urlpago,
            });
        } else {
            res.status(500).send({
                message: "No se encontro ninguna orden asociado al cliente",
            });
        }
    } catch (error) {
        console.log("Error: no se pudo consultar las ordenes del usuario ", error);
        res.status(500).send({
            message: "Problemas al consultar las ordenes del usuario",
        });
    }
};


const getpayment = async (req,res) =>{
    try {
        const pool = await getConnection();
        const { nrodcto, Tipodcto, Nit } = req.query
        const result = await pool 
            .request()
            .input("nrodcto", nrodcto)
            .input("Tipodcto", Tipodcto)
            .query(tsqlorder.DatosEnvio)
        
        const result2 = await pool 
            .request()
            .input("Nit", Nit)
            .query(tsqlorder.DatosCliente)   

        const result3 = await pool 
            .request()
            .input("nrodcto", nrodcto)
            .input("Tipodcto", Tipodcto)
            .query(tsqlorder.TotalArticulos)

        const result4 = await pool 
            .request()
            .input("Nit", Nit)
            .query(tsqlorder.DetalleTransacción)

        const DatosEnvio = result.recordsets[0]
        const DatosCliente = result2.recordsets[0]
        const TotalArticulos = result3.rowsAffected[0]
        const DetalleTransacción = result4.recordsets[0]



            res.send({
                DatosEnvio,
                DatosCliente,
                TotalArticulos,
                DetalleTransacción
            })

        
    } catch (error) {
        console.log("Error: no se pudo consultar las ordenes del usuario ", error);
        res.status(500).send({
            message: "Problemas al consultar las ordenes del usuario",
        });
    }

}
const getPedido = async (req, res) => {
    try {
        const pool = await getConnection();
        const { Nit } = req.query;
        const result = await pool
            .request()
            .input("Nit", sql.VarChar, Nit)
            .query(tsqlorder.pedido);
        if (result.rowsAffected[0] > 0) {
            const order = result.recordsets[0];
            res.send({
                order,
            });
        } else {
            res.status(500).send({
                message: "No se encontro ninguna orden asociado al cliente",
            });
        }
    } catch (error) {
        console.log("Error: no se pudo consultar las ordenes del usuario ", error);
        res.status(500).send({
            message: "Problemas al consultar las ordenes del usuario",
        });
    }
}; //

const getPedido_detail = async (req, res) => {
    try {
        const pool = await getConnection();
        const { TIPODCTO, NRODCTO, Nit } = req.query;

        const result = await pool
        .request()
        .input("Nit", sql.VarChar, Nit)
        .input("TIPODCTO", sql.VarChar, TIPODCTO)
        .input("NRODCTO", sql.VarChar, NRODCTO)
        .query(tsqlorder.pedido_detail);

        const result2 = await pool
            .request()
            .input("TIPODCTO", sql.VarChar, TIPODCTO)
            .input("NRODCTO", sql.VarChar, NRODCTO)
            .query(tsqlorder.pedido_detail1);
        if (result.rowsAffected[0] > 0) {
            const orders = result.recordsets[0];
            const order = result2.recordsets[0];
            const Articulos = result2.rowsAffected[0]


            res.send({
                orders,
                order,
                Articulos
            });
        } else {
            res.status(500).send({
                message: "No se encontro ninguna orden asociado al cliente",
            });
        }
    } catch (error) {
        console.log("Error: no se pudo consultar las ordenes del usuario ", error);
        res.status(500).send({
            message: "Problemas al consultar las ordenes del usuario",
        });
    }
};

const getfacture_orderb2b = async (req, res) => {
    try {
        const pool = await getConnection();
        const { Nit,page,limit } = req.query;
        const result = await pool
            .request()
            .input("Nit", sql.VarChar, Nit)
            .query(tsqlorder.orderb2b);
        if (result.rowsAffected[0] > 0) {
            let order = result.recordsets[0]
            order = await pagination(order, page, limit)
            res.send({
                order,
            });
        } else {
            res.status(500).send({
                message: "No se encontro ninguna orden asociado al cliente",
            });
        }
    } catch (error) {
        console.log("Error: no se pudo consultar las ordenes del usuario ", error);
        res.status(500).send({
            message: "Problemas al consultar las ordenes del usuario",
        });
    }
};

const getfacture_detailb2b = async (req, res) => {
    try {
        const pool = await getConnection();
        const { Tipodcto, Nrodcto } = req.query;
        const result = await pool
            .request()
            .input("Tipodcto", sql.VarChar, Tipodcto)
            .input("Nrodcto", sql.VarChar, Nrodcto)
            .query(tsqlorder.factureb2b);

        const result2 = await pool
            .request()
            .input("Tipodcto", sql.VarChar, Tipodcto)
            .input("Nrodcto", sql.VarChar, Nrodcto)
            .query(tsqlorder.facture_detailfech);

        if (result.rowsAffected[0] > 0) {
            const ContadorArt =  result.rowsAffected[0];
            const Articulos = result.recordsets[0];
            const date = result2.recordsets[0];

            res.send({
                date,
                ContadorArt,
                Articulos,
            });
        } else {
            res.status(500).send({
                message: "No se encuentra la factura seleccionada",
            });
        }
    } catch (error) {
        console.log("Error: no se encontro la factura enviada", error);
        res.status(500).send({
            message: "Problemas al consultar la factura",
        });
    }
};
/*
const getorderb2c = async (req, res) => {
  try {
    const pool = await getConnection();
    const { Nit } = req.query;
    const result = await pool
      .request()
      .input("Nit", sql.VarChar, Nit)
      .query(tsqlorder.orderb2c);
    if (result.rowsAffected[0] > 0) {
      const order = result.recordsets[0];
      res.send({
        order,
      });
    } else {
      res.satus(500).send({
        message: "No se encuentra la factura seleccionada",
      });
    }
  } catch (error) {
    console.log("Error: no se encontro la factura enviada", error);
    res.status(500).send({
      message: "Problemas al consultar la factura",
    });
  }
};

const getfactureb2c = async (req, res) => {
  try {
    const pool = await getConnection();
    const { Tipodcto, Nrodcto } = req.query;
    const result = await pool
      .request()
      .input("Tipodcto", sql.VarChar, Tipodcto)
      .input("Nrodcto", sql.VarChar, Nrodcto)
      .query(tsqlorder.factureb2c);
    if (result.rowsAffected[0] > 0) {
      const facture = result.recordsets[0];
      res.send({
        facture,
      });
    } else {
      res.satus(500).send({
        message: "No se encuentra la factura seleccionada",
      });
    }
  } catch (error) {
    console.log("Error: no se encontro la factura enviada", error);
    res.status(500).send({
      message: "Problemas al consultar la factura",
    });
  }
};*/

module.exports = {
    getMtPedido,
    getPedido,
    getPedido_detail,
    getfacture_orderb2b,
    getfacture_detailb2b,
    getstatus,
    getpayment
};
