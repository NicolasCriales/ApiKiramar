import { getConnection, sql } from '../database/connection'
import { tsqlsearch } from '../tsql'
import { pagination } from '../helpers/pagination'


const getsearch = async (req,res) => {
    try {
        const pool = await getConnection();
        const { IdListaPrecios, buscar,PrecioDesde,PrecioHasta , page, limit } = req.query
        const result = await pool
                .request()
                .input('IdListaPrecios', sql.VarChar,IdListaPrecios)
                .input('buscar', sql.VarChar, '%' + buscar + '%')
                .input('PrecioDesde', sql.VarChar, PrecioDesde )
                .input('PrecioHasta', sql.VarChar, PrecioHasta )
                .query(tsqlsearch.search);
        const result2 = await pool
                .request()
                .input('buscar', sql.VarChar, '%' + buscar + '%')
                .query(tsqlsearch.supplier);

        if (result.rowsAffected[0] > 0) {
            let search = result.recordsets[0]
            search = await pagination(search, page, limit)
            const supplier = result2.recordsets[0]
            res.send({
                search,
                supplier
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


const getsearchsupplier = async (req,res) =>{
    try {
        const pool = await getConnection();
        const { IdListaPrecios, buscar, shupplier,PrecioDesde,PrecioHasta, page, limit } = req.query
        const result = await pool
                .request()
                .input('IdListaPrecios', sql.VarChar,IdListaPrecios)
                .input('buscar', sql.VarChar, '%' + buscar + '%')
                .input('shupplier', sql.VarChar, shupplier )
                .input('PrecioDesde', sql.VarChar, PrecioDesde )
                .input('PrecioHasta', sql.VarChar, PrecioHasta )
                .query(tsqlsearch.searchsupplier);
        if (result.rowsAffected[0] > 0) {
            let searchsupplier = result.recordsets[0]
            searchsupplier = await pagination(searchsupplier, page, limit)
            res.send({
                searchsupplier
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
    getsearchsupplier
}
      