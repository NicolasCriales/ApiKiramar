import { getConnection, sql } from '../database/connection'
import { tsqlbanners } from '../tsql'
import { pagination } from '../helpers/pagination'


const getbanners = async (req,res) => {
    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .query(tsqlbanners.banners)
        if (result.rowsAffected[0] > 0) {
            const Banners = result.recordsets[0]
            res.send({
                Banners
            })
        } else {
            res.status(500).json({
                message: "No se encontro resultado de BANNERS"
            })  
        }
    } catch (error) {
        console.log('Error: No se pudo consultar los banners ', error)
        res.status(500).json({
            message: 'Problemas al consultar los banners',
        })  
    }

}

const getproducts_banners = async (req,res) => {
    try {
        const pool = await getConnection();
        const { IdListaPrecios, LikeNombreAlterno, LikeCodProveedor, page, limit } = req.query
        const result = await pool
                .request()
                .input('IdListaPrecios',sql.VarChar,IdListaPrecios)
                .input('LikeNombreAlterno',sql.VarChar,'%' + LikeNombreAlterno + '%')
                .input('LikeCodProveedor',sql.VarChar,'%' + LikeCodProveedor + '%')
                .query(tsqlbanners.products_banners)
        if (result.rowsAffected[0] > 0) {
            let products = result.recordsets[0]
            products = await pagination(products, page, limit)
            res.send({
                products
            })
        } else {
            res.status(500).json({
                message: "No se encontro resultado de los productos del banner"
            })  
        }
    } catch (error) {
        console.log('Error: No se pudo consultar los productos del banner ', error)
        res.status(500).json({
            message: 'Problemas al consultar los productos del banner',
        })  
    }
}

const getbanners_releases = async (req,res) => {
    try {
        const pool = await getConnection();
        const result = await pool
                .request()
                .query(tsqlbanners.banners_releases)
        if (result.rowsAffected[0] > 0) {
            const Banners = result.recordsets[0]
            res.send({
                Banners
            })
        } else {
            res.status(500).json({
                message: "No se encontro resultado de los lanzamientos"
            })  
        }
    } catch (error) {
        console.log('Error: No se pudo consultar los lanzamientos ', error)
        res.status(500).json({
            message: 'Problemas al consultar los lanzamientos',
        })  
    }
}

const getproducts_releases = async (req,res) => {
    try {
        const pool = await getConnection();
        const { IdListaPrecios, CodProveedor , page, limit } = req.query
        const result = await pool
                .request()
                .input('IdListaPrecios',sql.VarChar,IdListaPrecios)
                .input('CodProveedor',sql.VarChar,CodProveedor)
                .query(tsqlbanners.products_new)
        if (result.rowsAffected[0] > 0) {
            let Banners = result.recordsets[0]
            Banners = await pagination(Banners, page, limit)
            res.send({
                Banners
            })
        } else {
            res.status(500).json({
                message: "No se encontro resultado de los productos de lanzamiento"
            })  
        }
    } catch (error) {
        console.log('Error: No se pudo consultar los productos del lanzamiento ', error)
        res.status(500).json({
            message: 'Problemas al consultar los productos del lanzamiento',
        })  
    }
}

module.exports = {
	getbanners,
    getproducts_banners,
    getbanners_releases,
    getproducts_releases,
}
      