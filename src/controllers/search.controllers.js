import { getConnection, sql } from '../database/connection'
import { tsqlsearch } from '../tsql'
import { pagination } from '../helpers/pagination'


const getsearch = async (req,res) => {
    try {
        const pool = await getConnection();
        const { IdListaPrecios, buscar, page, limit } = req.query
        console.log(buscar);
        const result = await pool
                .request()
                .input('IdListaPrecios', sql.VarChar,IdListaPrecios)
                .input('buscar', sql.VarChar, '%' + buscar + '%')
                .query(tsqlsearch.search);
        if (result.rowsAffected[0] > 0) {
            let search = result.recordsets[0]
            search = await pagination(search, page, limit)
            res.send({
                search: search
            })
        } else {
            res.status(500).json({
                message: "No se encontro el producto"
            })
        }
    } catch (error) {
        console.log('Error: No se pudo consultar el producto', error)
        res.status(500).json({
            message: 'Problemas al consultar el producto',
        })  
    }

}

module.exports = {
	getsearch,
}
      