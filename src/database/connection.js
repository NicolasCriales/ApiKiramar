import sql from 'mssql'
import config from '../config'

const settings = {
    server: config.mssql_host,
    database: config.mssql_database,
    user: config.mssql_user,
    password: config.mssql_password,
    port: parseInt (config.mssql_port),
    options: {
        encrypt: false,
        trustServerCertificate: true,
        cryptoCredentialsDetails: {
            minVersion: 'TLSv1',
        },
    },
}

export const getConnection = async () => {
    try {
        const pool = await sql.connect(settings)
        return pool
    } catch (error) {
        console.log('Get Connection Error => ', error)
    }
}

export { sql }
