import { getConnection, sql } from '../database/connection'
import { tsqllogin } from '../tsql'
import { express } from 'express'

const getverifydata = async (req,res) =>{
    try {
        const { Nit, Email } = req.body
        const pool = await getConnection();
        const result = await pool
                .request()
                .input('nit', sql.VarChar, Nit)
                .input('email', sql.VarChar, Email)
                .query(tsqllogin.verifydata)
        if (result.rowsAffected[0] > 0) {
            res.send({
                mtcliente: result.recordsets
            })
        } else {
            res.status(500).json({
                message: "No se encontraron registros"
            })  
        }
    } catch (error) {
        console.log('Error: No se pudo consultar los clientes ', error)
        res.status(500).json({
            message: 'Problemas al consultar cliente',
        })  
    }
}
module.exports = {
	getverifydata
}
      