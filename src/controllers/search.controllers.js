import { getConnection, sql } from '../database/connection'
import { tsqlsearch } from '../tsql'


const getsearch = async (req,res) => {
    try {
        const pool = await getConnection();
        const { IdListaPrecios, buscar } = req.body;
        console.log(buscar);
        const result = await pool
                .request()
                .input('IdListaPrecios', sql.VarChar,IdListaPrecios)
                .input('buscar', sql.VarChar, '%' + buscar + '%')
                .query(tsqlsearch.search);
        if (result.rowsAffected[0] > 0) {
            res.send({
                search: result.recordsets
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
      