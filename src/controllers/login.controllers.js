import { getConnection, sql } from '../database/connection'
import { tsqllogin } from '../tsql'
import { express } from 'express'

const getverifydata = async (req,res) =>{
    try {
        const { password, Nit } = req.body
        const pool = await getConnection();
        const result = await pool
                .request()
                .input('password', sql.VarChar, password)
                .input('Nit', sql.VarChar, Nit)
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

const update_data = async (req,res) =>{}

module.exports = {
	getverifydata,
    update_data
}
      