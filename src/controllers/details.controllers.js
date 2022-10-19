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

const getPQRS = async (req,res) => {
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

const getidPQRS= async (req,res) => {
    try {
        const pool = await getConnection();
        const { Nit,id } = req.query
        const result = await pool
            .request()
            .input("Nit", sql.VarChar, Nit)
            .input("id", sql.VarChar, id)
            .query(tsqldetails.idPQRS)
        if(result.rowsAffected[0] > 0){
            const idPQRS = result.recordsets[0]
            res.send({
                idPQRS
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

const getregisterReview = async (req,res) => {
    try {
        const pool = await getConnection();
        const { idproducto,calificacion,opinion,nombre } = req.body
        const result = await pool 
            .request()
            .input("idproducto", sql.VarChar,idproducto)
            .input("calificacion",calificacion)
            .input("opinion",sql.VarChar,opinion)
            .input("nombre",sql.VarChar,nombre)
            .query(tsqldetails.registerReview)
        res.send({
            registerReview: "la review se guardo"
        })
    } catch (error) {
        console.log('Error: No se pudo consultar la ficha tecnica ', error)
        res.status(500).json({
            message: 'Problemas',
        })  
    }
}

const getreview = async (req,res) => {
    try {
        const pool = await getConnection();
        const { idproducto } = req.query
        const result = await pool
            .request()
            .input("idproducto", sql.VarChar, idproducto)
            .query(tsqldetails.review)
        if(result.rowsAffected[0] > 0) {
            const review = result.recordsets[0]
            res.send({
                review
            })
        } else {
            res.status(500).json({
                message: "No hay reseñas"
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
    getPQRS,
    getidPQRS,
    getregisterReview,
    getreview
}
