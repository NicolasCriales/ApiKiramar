import { getConnection, sql } from '../database/connection'
import { tsqlbanners } from '../tsql'


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
                message: "No se encontro resultado de ciudades"
            })  
        }
    } catch (error) {
        console.log('Error: No se pudo consultar las ciudades ', error)
        res.status(500).json({
            message: 'Problemas al consultar las ciudades',
        })  
    }

}

const getproducts_banners = async (req,res) => {
    try {
        const pool = await getConnection();
        const { IdListaPrecios, LikeNombreAlterno, LikeCodProveedor } = req.body
        const result = await pool
                .request()
                .input('IdListaPrecios',sql.VarChar,IdListaPrecios)
                .input('LikeNombreAlterno',sql.VarChar,'%' + LikeNombreAlterno + '%')
                .input('LikeCodProveedor',sql.VarChar,'%' + LikeCodProveedor + '%')
                .query(tsqlbanners.products_banners)
        if (result.rowsAffected[0] > 0) {
            const products = result.recordsets[0]
            res.send({
                products
            })
        } else {
            res.status(500).json({
                message: "No se encontro resultado de ciudades"
            })  
        }
    } catch (error) {
        console.log('Error: No se pudo consultar las ciudades ', error)
        res.status(500).json({
            message: 'Problemas al consultar las ciudades',
        })  
    }

}

module.exports = {
	getbanners,
    getproducts_banners,
}
      