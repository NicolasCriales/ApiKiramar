import { getConnection, sql } from '../database/connection'
import { tsqlworld } from '../tsql'
import { pagination } from '../helpers/pagination'


const getworld = async (req,res) => {
    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .query(tsqlworld.world)
        res.send({
            world: result.recordsets
        })
    } catch (error) {
        console.log('Error: No se pudo consultar los mundos ', error)
        res.status(500).json({
            message: 'Problemas al consultar mundos',
        })
    }
}

const getcategoryworld = async (req,res) =>{
    try {
        const pool = await getConnection();
        const { CODLINEA, page, limit } = req.query
        const result = await pool
                .request()
                .input('CODLINEA', sql.VarChar,CODLINEA)
                .query(tsqlworld.categoryworld)
        if (result.rowsAffected[0] > 0) {
            let categoryworld = result.recordsets[0]
            categoryworld = await pagination(categoryworld, page, limit)
            res.send({
                categoryworld
            })
        } else {
            res.status(500).json({
                message: "No se encontro categorias del mundo"
            })  
        }
    } catch (error) {
        console.log('Error: No se pudo consultar el mundo', error)
        res.status(500).json({
            message: 'Problemas al consultar el mundo',
        })  
    }
}



const getcategoryproduct = async (req,res) =>{
    try {
        const pool = await getConnection();
        const { IdListaPrecios,CODLINEA,codcategory, page, limit } = req.query
        const result = await pool
                .request()
                .input('IdListaPrecios', sql.VarChar,IdListaPrecios)
                .input('CODLINEA', sql.VarChar,CODLINEA)
                .input('codcategory', sql.VarChar,codcategory)
                .query(tsqlworld.productcategory)
        if (result.rowsAffected[0] > 0) {
            let categoryworld = result.recordsets[0]
            categoryworld = await pagination(categoryworld, page, limit)
            res.send({
                categoryworld: categoryworld
            })
        } else {
            res.status(500).json({
                message: "No se encontro categorias del mundo"
            })  
        }
    } catch (error) {
        console.log('Error: No se pudo consultar el mundo ', error)
        res.status(500).json({
            message: 'Problemas al consultar el mundo',
        })  
    }
}



module.exports = {
    getworld,
    getcategoryworld,
    getcategoryproduct,
}
      