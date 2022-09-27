import { getConnection, sql } from '../database/connection'
import { tsqlproducts } from '../tsql'
import { pagination } from '../helpers/pagination'

const getproducts = async (req, res) => {
    try {
        const { IdListaPrecios, page, limit } = req.query
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
        const { IdArticulo, IdListaPrecios } = req.query
        const pool = await getConnection();
        const result = await pool
            .request()
            .input('IdArticulo', sql.VarChar, IdArticulo)
            .input('IdListaPrecios', sql.VarChar, IdListaPrecios)
            .query(tsqlproducts.getproducts_individually)
        if (result.rowsAffected[0] > 0) {
            const products_individually =  result.recordsets[0]
            res.send({
                products_individually
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
        const { IdListaPrecios, page, limit } = req.query
        const result = await pool
            .request()
            .input('IdListaPrecios', sql.VarChar, IdListaPrecios)
            .query(tsqlproducts.getproducts_discount)
        if (result.rowsAffected[0] > 0) {
            let products_discount = result.recordsets[0]
            products_discount = await pagination(products_discount, page, limit)
            res.send({
                products_discount
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


const getproducts_lastunits = async (req, res) => {
    try {
        const pool = await getConnection();
        const { IdListaPrecios, page, limit } = req.query
        const result = await pool
            .request()
            .input('IdListaPrecios', sql.VarChar, IdListaPrecios)
            .query(tsqlproducts.getproducts_lastunits)
        if (result.rowsAffected[0] > 0) {
            let products_lastunits = result.recordsets[0]
            products_lastunits = await pagination(products_lastunits, page, limit)
            res.send({
                products_lastunits: products_lastunits
            })
        } else {
            res.status(500).json({
                message: "No se encontro la lista de las ultimas unidades"
            })
        }
    } catch (error) {
        console.log('Error: No se pudo consultar los productos con ultimas unidades ', error)
        res.status(500).json({
            message: 'Problemas al consultar los productos con descuento',
        })
    }
}

const getproducts_recommends = async (req, res) => {
    try {
        const pool = await getConnection();
        const { IdListaPrecios, Codlinea, CodSubLinea } = req.query
        const result = await pool
            .request()
            .input('IdListaPrecios', sql.VarChar, IdListaPrecios)
            .input('Codlinea', sql.VarChar, Codlinea)
            .input('CodSubLinea', sql.VarChar, CodSubLinea)
            .query(tsqlproducts.getproducts_recommends)
        if (result.rowsAffected[0] > 0) {
           const products_recommends = result.recordsets[0]
            res.send({
                products_recommends
            })
        } else {
            res.status(500).json({
                message: "No se encontro la lista de las ultimas unidades"
            })
        }
    } catch (error) {
        console.log('Error: No se pudo consultar los productos con ultimas unidades ', error)
        res.status(500).json({
            message: 'Problemas al consultar los productos con descuento',
        })
    }
}


const getBest_sellers = async (req, res) => {
    try {
        const pool = await getConnection();
        const {IdListaPrecios, page, limit} =  req.query
        const result = await pool
            .request()
            .input('IdListaPrecios', sql.VarChar, IdListaPrecios)
            .query(tsqlproducts.getBest_sellers)
        if (result.rowsAffected[0] > 0) {
           let Best_sellers = result.recordsets[0]
           Best_sellers = await pagination(Best_sellers, page, limit)
            res.send({
                Best_sellers
            })
        } else {
            res.status(500).json({
                message: "No se encontro la lista de las ultimas unidades"
            })
        }
    } catch (error) {
        console.log('Error: No se pudo consultar los productos con ultimas unidades ', error)
        res.status(500).json({
            message: 'Problemas al consultar los productos con descuento',
        })
    }
}

module.exports = {
    getproducts,
    getproducts_individually,
    getproducts_discount,
    getproducts_lastunits,
    getproducts_recommends,
    getBest_sellers,
}
