import { getConnection, sql } from '../database/connection'
import { tsqlcategory } from '../tsql'
import { express } from 'express'
import { pagination } from '../helpers/pagination'


const getcategory = async (req,res) =>{
    try {
        const pool = await getConnection();
        const { page, limit } = req.query
        const result = await pool
                .request()
                .query(tsqlcategory.category)
        if (result.rowsAffected[0] > 0) {
            let category = result.recordsets[0]
            category = await pagination(category, page, limit)
            res.send({
                category
            })
        } else {
            res.status(500).json({
                message: "No se encontro categoria"
            })  
        }
    } catch (error) {
        console.log('Error: No se pudo consultar las categorias ', error)
        res.status(500).json({
            message: 'Problemas al consultar las categorias',
        })  
    }
}

const getproductcategory = async(req,res) =>{
    try {
        const pool = await getConnection();
        const { IdListaPrecios,CODSUBLINEA } = req.query
        const result = await pool
                .request()
                .input('IdListaPrecios', sql.VarChar,IdListaPrecios)
                .input('CODSUBLINEA',sql.VarChar,CODSUBLINEA)
                .query(tsqlcategory.productcategory)
        if (result.rowsAffected[0] > 0) {
            let productcategory = result.recordsets[0]
            res.send({
                productcategory
            })
        } else {
            res.status(500).json({
                message: "No se encontraron productos de la categoria"
            })  
        }
    } catch (error) {
        console.log('Error: No se pudo consultar los productos de la categoria', error)
        res.status(500).json({
            message: 'Problemas al consultar los productos de la categoria',
        })  
    }

}
module.exports = {
	getcategory,
    getproductcategory,
}
      