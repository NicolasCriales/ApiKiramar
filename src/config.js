import 'dotenv/config'

export default {

    mssql_host: process.env.MSSQL_HOST,
    mssql_database: process.env.MSSQL_DATABASE,
    mssql_user: process.env.MSSQL_USER,
    mssql_password: process.env.MSSQL_PASSWORD,
    mssql_port: process.env.MSSQL_PORT,
    port: process.env.PORT || 8080,

    token: process.env.TOKEN,
}


