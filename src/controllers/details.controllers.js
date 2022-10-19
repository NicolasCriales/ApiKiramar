import { getConnection, sql } from '../database/connection'
import { tsqldetails } from '../tsql'


const getdatasheet = async (req,res) => {
    try {
        const pool = await getConnection();
        const { IdArticulo } = req.query
        const result = await pool
                .request()
                .input("IdArticulo", sql.VarChar, IdArticulo)
                .query(tsqldetails.datasheet)
        if (result.rowsAffected[0] > 0) {
            const datasheet = result.recordsets[0]
            res.send({
                datasheet
            })
        } else {
            res.status(500).json({
                message: "No se encontro ficha tecnica"
            })  
        }
    } catch (error) {
        console.log('Error: No se pudo consultar la ficha tecnica ', error)
        res.status(500).json({
            message: 'Problemas al consultar la ficha tecnica',
        })  
    }
}

const gettypePQRS = async (req,res) => {
    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .query(tsqldetails.typePQRS)
        if (result.rowsAffected[0] > 0) {
            const typePQRS = result.recordsets[0]
            res.send({
                typePQRS
            })
        } else {
            res.status(500).json({
                Message: "No hay datos"
            })
        }     
    } catch (error) {
        console.log('Error: No se pudo consultar la ficha tecnica ', error)
        res.status(500).json({
            message: 'Problemas al consultar la ficha tecnica',
        })  
    }
}

const getregisterPQRS = async (req,res) => {
    try {
        const pool = await getConnection();
        const FechaGenerada = new Date();
        const Fecha = new Date(FechaGenerada).toLocaleDateString("en-CA");
        const FechaKiramar = Fecha + " " + "00:00:00.000";
        const { Codigo,motivo,Nit } = req.body  
        console.log(FechaKiramar,Codigo,motivo,Nit );  
        const result = await pool 
            .request()
            .input("Codigo", sql.Int, Codigo)
            .input("motivo", sql.NVarChar, motivo)
            .input("Nit", sql.NVarChar, Nit)
            .input("FechaKiramar", FechaKiramar)
            .query(tsqldetails.registerPQRS)
        res.send({
            registerPQRS: "Le responderemos pronto"
        })
    } catch (error) {
        console.log('Error: No se pudo consultar la ficha tecnica ', error)
        res.status(500).json({
            message: 'Problemas',
        })  
    }
}

const getPQRS= async (req,res) => {
    try {
        const pool = await getConnection();
        const { Nit } = req.query
        const result = await pool
            .request()
            .input("Nit", sql.VarChar, Nit)
            .query(tsqldetails.PQRS)
        if(result.rowsAffected[0] > 0){
            const PQRS = result.recordsets[0]
            res.send({
                PQRS
            })
        } else {
            res.status(500).query({
                message: "Este cliente no tiene PQRS"
            })
        }
    } catch (error) {
        console.log('Error: No se pudo consultar la ficha tecnica ', error)
        res.status(500).json({
            message: 'Problemas',
        })  
    }
}

module.exports = {
	getdatasheet,
    gettypePQRS,
    getregisterPQRS,
    getPQRS
}
