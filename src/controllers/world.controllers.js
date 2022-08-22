import { getConnection, sql } from '../database/connection'
import { tsqlworld } from '../tsql'

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
        const { world } = req.body
        const result = await pool
                .request()
                .input('world', sql.VarChar,world)
                .query(tsqlworld.categoryworld)
        if (result.rowsAffected[0] > 0) {
            res.send({
                categoryworld: result.recordsets
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



const getcategoryproduct = async (req,res) =>{
    try {
        const pool = await getConnection();
        const { IdListaPrecios,world,codcategory } = req.body
        const result = await pool
                .request()
                .input('IdListaPrecios', sql.VarChar,IdListaPrecios)
                .input('world', sql.VarChar,world)
                .input('codcategory', sql.VarChar,codcategory)
                .query(tsqlworld.productcategory)
        if (result.rowsAffected[0] > 0) {
            res.send({
                categoryworld: result.recordsets
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
      