import { getConnection, sql } from '../database/connection'
import { tsqllogin } from '../tsql'
import bcryptjs from 'bcryptjs'
import { express } from 'express'
import { Buffer } from 'node:buffer';


const getverifydata = async (req,res) =>{
     try {
        const pool = await getConnection();
        const { password, Nit } = req.body
        const result = await pool
                .request()
                .input('Nit', sql.VarChar, Nit)
                .query(tsqllogin.verify)
        const data_client = result.recordsets[0][0]
        const validPassword = bcryptjs.compareSync( password, data_client.password)
        if (validPassword) {
            res.send({
                client: data_client
            })
        }else {
            res.status(500).json({
                message: "Nit o Contraseña incorrectos"
            })  
        }
    } catch (error) {
        console.log('Error: No se pudo consultar los clientes ', error)
        res.status(500).json({
            message: 'Problemas al consultar cliente',
        })  
    }  
}

const GetUpdatePassword = async (req,res) => {
    try {
        const pool = await getConnection()
        const { UpdatePassword,Nit } = req.body
        const  PasswordCode = UpdatePassword;
        const DecryptPassword = new Buffer(PasswordCode, 'base64');
        const Password = DecryptPassword.toString('ascii');
        const separatepassword = Password.split("&")
        const oldpassword = separatepassword[0]
        const newpassword =  separatepassword[1]
        const salt = bcryptjs.genSaltSync(10);
        const encryptpassword = bcryptjs.hashSync(newpassword, salt);

        const result = await pool
        .request()
        .input('Nit', sql.VarChar, Nit)
        .query(tsqllogin.verify)
    const data_client = result.recordsets[0][0]
    const validPassword = bcryptjs.compareSync( oldpassword, data_client.password)

    console.log(bcryptjs.compareSync( oldpassword, data_client.password));

    if (validPassword) {
        result2 = await pool
            .request()
            .input('Nit', sql.VarChar, Nit)
            .input('encryptpassword', sql.VarChar, encryptpassword)
            .query(tsqllogin.changePassword)
        res.send({
            result: "SE cambio la contraseña exitosamente"
        })
    }else {
        res.status(500).json({
            message: "Contraseña no coincide"
        })  
    }

    } catch (error) {
        console.log('Error: No se pudo consultar los clientes ', error)
        res.status(500).json({
            message: 'Problemas al consultar cliente',
        })  
    }  
}

module.exports = {
	getverifydata,
    GetUpdatePassword
}
      