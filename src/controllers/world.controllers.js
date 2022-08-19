import { getConnection, sql } from '../database/connection'
import { tsqlworld } from '../tsql'

const getworld = async (req,res) => {
    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .query(tsqlworld.world)
        
        res.send({
            world: result
        })
    } catch (error) {
        console.log('Error: No se pudo consultar los mundos ', error)
        res.status(500).json({
            message: 'Problemas al consultar mundos',
        })
    }

}


module.exports = {
    getworld,
}
      