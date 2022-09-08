import { getConnection, sql } from '../database/connection'
import { tsqlproducts } from '../tsql'
import { pagination } from '../helpers/pagination'

const getproducts = async (req, res) => {
    try {
        const { IdListaPrecios } = req.body
        const { page, limit } = req.query
        const pool = await getConnection();
        const result = await pool
            .request()
            .input('IdListaPrecios', sql.VarChar, IdListaPrecios)
            .query(tsqlproducts.getproducts)
        if (result.rowsAffected[0] > 0) {
            let products = result.recordsets[0]
            products = await pagination(products, page, limit)
            res.send({
                products: products
            })
        }
    } catch (error) {
        console.log('Error: No se pudo consultar los productos ', error)
        res.status(500).json({
            message: 'Problemas al consultar los productos',
        })
    }
}

const getproducts_individually = async (req, res) => {
    try {
        const { IdArticulo, IdListaPrecios } = req.body
        const pool = await getConnection();
        const result = await pool
            .request()
            .input('IdArticulo', sql.VarChar, IdArticulo)
            .input('IdListaPrecios', sql.VarChar, IdListaPrecios)
            .query(tsqlproducts.getproducts_individually)
        if (result.rowsAffected[0] > 0) {
            res.send({
                products_individually: result.recordsets
            })
        } else {
            res.status(500).json({
                message: "No se encontro resultado, verificar los datos"
            })
        }
    } catch (error) {
        console.log('Error: No se pudo consultar los productos individuales ', error)
        res.status(500).json({
            message: 'Problemas al consultar los productos individuales',
        })
    }
}


const getproducts_discount = async (req, res) => {
    try {
        const pool = await getConnection();
        const { IdListaPrecios } = req.body
        const result = await pool
            .request()
            .input('IdListaPrecios', sql.VarChar, IdListaPrecios)
            .query(tsqlproducts.getproducts_discount)
        if (result.rowsAffected[0] > 0) {
            res.send({
                products_discount: result.recordsets
            })
        } else {
            res.status(500).json({
                message: "No se encontro la lista de precio del producto con descuento"
            })
        }
    } catch (error) {
        console.log('Error: No se pudo consultar los productos con descuento ', error)
        res.status(500).json({
            message: 'Problemas al consultar los productos con descuento',
        })
    }
}

module.exports = {
    getproducts,
    getproducts_individually,
    getproducts_discount,
}
