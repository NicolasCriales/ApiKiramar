import { getConnection, sql } from '../database/connection'
import { tsqllogin } from '../tsql'
import bcryptjs from 'bcryptjs'
import { express } from 'express'

const getverifydata = async (req,res) =>{
     try {
        const pool = await getConnection();
        const { password, Nit } = req.body
        const result = await pool
                .request()
                .input('Nit', sql.VarChar, Nit)
                .query(tsqllogin.verify)
        const data_client = result.recordsets[0][0]
        const validPassword = bcryptjs.compareSync( password, data_client.password)
        if (validPassword) {
            res.send({
                client: data_client
            })
        }else {
            res.status(500).json({
                message: "Nit o Contraseña incorrectos"
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
      