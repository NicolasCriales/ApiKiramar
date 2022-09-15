import { getConnection, sql } from '../database/connection'
import { tsqldatasheet } from '../tsql'


const getdatasheet = async (req,res) => {
    try {
        const pool = await getConnection();
        const { IdArticulo } = req.body
        const result = await pool
                .request()
                .input("IdArticulo", sql.VarChar, IdArticulo)
                .query(tsqldatasheet.datasheet)
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

module.exports = {
	getdatasheet,
}
