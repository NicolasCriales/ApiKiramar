import { getConnection, sql } from '../database/connection'
import { tsqlorder } from '../tsql'
import { express } from 'express'

const getorderb2b = async (req,res) => {
    try {
        const pool = await getConnection();
        const { Nit } = req.body
        const result = await pool
                .request()
                .input('Nit', sql.VarChar, Nit)
                .query(tsqlorder.orderb2b)
            if (result.rowsAffected[0] > 0) {
                res.send({
                    order: result.recordsets
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

const getfactureb2b = async (req,res) => {
    try {
        const pool = await getConnection();
        const { Tipodcto, Nrodcto }  = req.body
        const result = await pool
                .request()
                .input('Tipodcto', sql.VarChar, Tipodcto)
                .input('Nrodcto', sql.VarChar, Nrodcto)
                .query(tsqlorder.factureb2b)
        if (result.rowsAffected[0] > 0) {
            res.send({
                facture: result.recordsets
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
        const { Tipodcto, Nrodcto } = req.body
        const result = await pool
                .request()
                .input('Tipodcto', sql.VarChar, Tipodcto)
                .input('Nrodcto', sql.VarChar, Nrodcto)
                .query(tsqlorder.orderb2c)
        if (result.rowsAffected[0] > 0) {
            res.send({
                facture: result.recordsets
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
        const { Tipodcto, Nrodcto }  = req.body
        const result = await pool
                .request()
                .input('Tipodcto', sql.VarChar, Tipodcto)
                .input('Nrodcto', sql.VarChar, Nrodcto)
                .query(tsqlorder.factureb2c)
        if (result.rowsAffected[0] > 0) {
            res.send({
                facture: result.recordsets
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
	getorderb2b,
    getfactureb2b,
    getorderb2c,
    getfactureb2c,
}
      