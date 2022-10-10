import { getConnection, sql } from '../database/connection'
import { tsqlorder } from '../tsql'

const getMtPedido = async (req,res) => {
    try {
        const pool = await getConnection();
        const FechaGenerada = new Date()
        const Fecha = new Date(FechaGenerada).toLocaleDateString('en-CA')
        const FechaKiramar = Fecha + ' ' + '00:00:00.000'

      

        console.log(FechaKiramar);

        const { FECHA, NIT, BRUTO, DESCUENTO, TOTALIVA, NETO,product,
                PRODUCTO,CANTIDAD,CANTORIG,VALORUNIT,IVA,DTOBASE,DTOPROMO,CONDCTOPROMO,DTOAUTORIZADO,CONDCTOAUTORIZADO,DTOCCIAL,CONDCTOCOMERCIAL,CONIVA,MVNETO
              } = req.body
        const result = await pool 
        .request()
        .query(

            `insert into MtPedido
            (
                [TIPODCTO], [NRODCTO], [FECHA], [CODVEN], [NIT], [BRUTO], [DESCUENTO], [TOTALIVA], [NETO], [NOTA], [ESTADOPED], [TIPOFAC], [NROFACTURA], [FECHAFACT], [SYNC], [LATITUD], [LONGITUD], [IDCOMPRA], [COMENTARIO], [AUTORIZADOPOR], [SYNCCLOUD], [FECHAING]
            )
            values 
            (
                'F2','2',  cast(${FechaKiramar} as datatime2) as FECHA , '1052','${NIT}','${BRUTO}','${DESCUENTO}','${TOTALIVA}', '${NETO}', 'COMPRA Kiramar app', '1','NULL','NULL','NULL','S','0','0','NULL', 'COMPRA APK','NCRIALES','S','NULL'
            )`
        );
        for (let i=0;i <  product.length; i++ ) {
            const result2 = await pool
                .request()
                .query(
                    `insert into  MvPedido
                    (
                        [TIPODCTO], [NRODCTO], [BODEGA], [PRODUCTO], [CANTIDAD], [CANTORIG], [VALORUNIT], [IVA], [DTOBASE], [DTOPROMO], [CONDCTOPROMO], [DTOAUTORIZADO], [CONDCTOAUTORIZADO], [DTOCCIAL], [CONDCTOCOMERCIAL], [CONIVA], [NETO], [NOTA]
                    )
                    values
                    (
                        'F2', '2' , '1101', '${product[i].PRODUCTO}', '${product[i].CANTIDAD}', '${product[i].CANTORIG}', '${product[i].VALORUNIT}','${product[i].IVA}', '${product[i].DTOBASE}', '${product[i].DTOPROMO}', '${product[i].CONDCTOPROMO}', '${product[i].DTOAUTORIZADO}', '${product[i].CONDCTOAUTORIZADO}', '${product[i].DTOCCIAL}','${product[i].CONDCTOCOMERCIAL}','${product[i].CONIVA}', '${product[i].MVNETO}', 'COMPRA Kiramar app'
                    )`      
                );
        }

        res.send({
            message: "se guardo los datos"
        })

        
    } catch (error) {
        console.log('Error: no se pudo consultar las ordenes del usuario ', error);
        res.status(500).send({
            message: 'Problemas al consultar las ordenes del usuario'
        })
        
    } 

}



const getfacture_orderb2b = async (req,res) => {
    try {
        const pool = await getConnection();
        const { Nit } = req.query
        const result = await pool
                .request()
                .input('Nit', sql.VarChar, Nit)
                .query(tsqlorder.orderb2b)
            if (result.rowsAffected[0] > 0) {
                const order = result.recordsets[0]
                res.send({
                    order
                })
            } else {
                res.status(500).send({
                    message: 'No se encontro ninguna orden asociado al cliente'
                })
            }
    } catch (error) {
        console.log('Error: no se pudo consultar las ordenes del usuario ', error);
        res.status(500).send({
            message: 'Problemas al consultar las ordenes del usuario'
        })
        
    }   
}

const getfacture_detailb2b = async (req,res) => {
    try {
        const pool = await getConnection();
        const { Tipodcto, Nrodcto }  = req.query
        const result = await pool
                .request()
                .input('Tipodcto', sql.VarChar, Tipodcto)
                .input('Nrodcto', sql.VarChar, Nrodcto)
                .query(tsqlorder.factureb2b)
        if (result.rowsAffected[0] > 0) {
            const facture = result.recordsets[0]
            res.send({
                facture
            })
        } else {
            res.satus(500).send({
                message: 'No se encuentra la factura seleccionada'
            })
        }
    } catch (error) {
        console.log('Error: no se encontro la factura enviada', error);
        res.status(500).send({
            message: 'Problemas al consultar la factura'
        })
    }
}


const getorderb2c = async (req,res) => {
    try {
        const pool = await getConnection();
        const { Nit } = req.query
        const result = await pool
                .request()
                .input('Nit', sql.VarChar, Nit)
                .query(tsqlorder.orderb2c)
        if (result.rowsAffected[0] > 0) {
            const order = result.recordsets[0]
            res.send({
                order
            })
        } else {
            res.satus(500).send({
                message: 'No se encuentra la factura seleccionada'
            })
        }
    } catch (error) {
        console.log('Error: no se encontro la factura enviada', error);
        res.status(500).send({
            message: 'Problemas al consultar la factura'
        })
    }
}


const getfactureb2c = async (req,res) => {
    try {
        const pool = await getConnection();
        const { Tipodcto, Nrodcto }  = req.query
        const result = await pool
                .request()
                .input('Tipodcto', sql.VarChar, Tipodcto)
                .input('Nrodcto', sql.VarChar, Nrodcto)
                .query(tsqlorder.factureb2c)
        if (result.rowsAffected[0] > 0) {
            const facture =  result.recordsets[0]
            res.send({
                facture
            })
        } else {
            res.satus(500).send({
                message: 'No se encuentra la factura seleccionada'
            })
        }
    } catch (error) {
        console.log('Error: no se encontro la factura enviada', error);
        res.status(500).send({
            message: 'Problemas al consultar la factura'
        })
    }
}


module.exports = {
    getMtPedido,
	getfacture_orderb2b,
    getfacture_detailb2b,
    getorderb2c,
    getfactureb2c,
}
      