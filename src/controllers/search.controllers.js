import { getConnection, sql } from '../database/connection'
import { tsqlsearch } from '../tsql'
import { pagination } from '../helpers/pagination'


const getsearch = async (req,res) => {
    try {
        const pool = await getConnection();
        const { IdListaPrecios, buscar, page, limit } = req.query
        const result = await pool
                .request()
                .input('IdListaPrecios', sql.VarChar,IdListaPrecios)
                .input('buscar', sql.VarChar, '%' + buscar + '%')
                .query(tsqlsearch.search);
        const result2 = await pool
                .request()
                .input('IdListaPrecios', sql.VarChar,IdListaPrecios)
                .input('buscar', sql.VarChar, '%' + buscar + '%')
                .query(tsqlsearch.supplier);

        const result3 = await pool
                .request()
                .input('IdListaPrecios', sql.VarChar,IdListaPrecios)
                .input('buscar', sql.VarChar, '%' + buscar + '%')
                .query(tsqlsearch.category);

        const result4 = await pool
                .request()
                .input('IdListaPrecios', sql.VarChar,IdListaPrecios)
                .input('buscar', sql.VarChar, '%' + buscar + '%')
                .query(tsqlsearch.max_min);

        if (result.rowsAffected[0] > 0) {
            let search = result.recordsets[0]
            search = await pagination(search, page, limit)
            const supplier = result2.recordsets[0]
            const category = result3.recordsets[0]
            const max_min = result4.recordsets[0]

            res.send({
                search,
                supplier,
                category,
                max_min 
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
        const {IdListaPrecios, buscar,CodProveedor,category  ,page, limit } = req.query
        
        if (category.length != 0) {
            var addcategory = `and  mta.NombreSubLinea in (${category})`
        } else {
            var addcategory = ``
        }

        if (CodProveedor.length != 0) {
            var addcodsumin= `and PROV.codsumin in (${CodProveedor})  ) as AUX `
        } else {
            var addcodsumin= `) as AUX `
        }

        var sql_searchsupplier = tsqlsearch.searchsupplier + addcategory + addcodsumin
        const result = await pool
                .request()
                .input('IdListaPrecios', sql.VarChar,IdListaPrecios)
                .input('buscar', sql.VarChar, '%' + buscar + '%')
                .query(sql_searchsupplier);
        if (result.rowsAffected[0] > 0) {
            let search = result.recordsets[0]
            search = await pagination(search, page, limit)
            res.send({
                search
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
      