import { getConnection, sql } from '../database/connection'
import { tsqllogin } from '../tsql'


const getverifydata = async (req,res) =>{
    try {
        const pool = await getConnection();
        const headers = req.headers
        const result = await pool
                .request()
                .input('nit', headers.nit)
                .query(tsqllogin.verifydata)

        res.send({
                mtcliente: result
        })
        
    } catch (error) {
        console.log('Error: No se pudo consultar los clientes ', error)
        res.status(500).json({
            message: 'Problemas al consultar cliente',
        })
        
    }
}


module.exports = {
	getverifydata
}
      