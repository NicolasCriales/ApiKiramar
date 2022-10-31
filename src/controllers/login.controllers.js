import { getConnection, sql } from '../database/connection'
import { tsqllogin } from '../tsql'
import bcryptjs from 'bcryptjs'
import { express } from 'express'
import { Buffer } from 'node:buffer';
import nodemailer from 'nodemailer';




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
        const DecryptPassword = new Buffer.from(PasswordCode, 'base64');
        const Password = DecryptPassword.toString('ascii');
        const separatepassword = Password.split("&")
        const oldpassword = separatepassword[0]
        const newpassword =  separatepassword[1]
        const salt = bcryptjs.genSaltSync(10);
        const encryptpassword =  bcryptjs.hashSync(newpassword, salt);

        const result = await pool
            .request()
            .input('Nit', sql.VarChar, Nit)
            .query(tsqllogin.verify)
        const data_client = result.recordsets[0][0]
        const validPassword = bcryptjs.compareSync( oldpassword, data_client.password)
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

const getsendmail = async (req,res) => {
    try {
        const pool = await getConnection()
        const { Nit } = req.body
        const result = await pool 
            .request()
            .input("Nit", sql.NVarChar, Nit)
            .query(tsqllogin.verify)
        if(result.rowsAffected[0] > 0) {

            const codigo = Math.random();
            const codpassword = codigo.toString().slice(2,8)
            const result2 = await pool 
                .request()
                .input("Nit", sql.NVarChar, Nit)
                .input("codpassword",  codpassword)
                .query(tsqllogin.updatecodigo)

            const transporter = nodemailer.createTransport({
                host: "smtp-mail.outlook.com",
                port: 587, 
                secure: false,  // verdadero para 587, falso para otros puertos
                auth: {
                  user:  'auxsistemas1@kiramar.com.co', //correo etérea generada
                  pass: 'sistemas1020@', //contraseña etérea generada
                },
            });
    
            // enviar correo con objeto de transporte definido
            const mailoption = {
                from: 'auxsistemas1@kiramar.com.co', // dirección del remitente
                to:`${result.recordsets[0][0].Email}`,  //lista de receptores
                subject: "Recuperar clave Kiramar S.A.S",  //Línea de asunto
                text: `Este es su codigo de recuperacion ${codpassword}` //cuerpo de texto sin formato
            }
            transporter.sendMail(mailoption, (err, result) =>{
                if (err){
                    console.log(err)
                        res.json('ocurrio un error')
                } else{
                        res.json('Se envio la notificacion al correo');
                }
            });        
            res.send({
                message: 'Se envio el codigo a su correo electronico'
            })  

        } else {
            res.status(500).json({
                mensagge: "no se encontro el nit de usuario"
            })
        }

 
    } catch (error) {
        console.log('Error: No se pudo consultar los clientes ', error)
        res.status(500).json({
            message: 'Problemas al consultar cliente',
        })  
    }  

}

 const getrecoverpassword = async (req,res) => {
    try {
        const pool = await getConnection()
        const { codigo,Nit } = req.body
        const result = await pool
            .request()
            .input("Nit",Nit)
            .query(tsqllogin.recoverpassword)
        const recoverpassword = result.recordsets[0][0].codpassword
        if(recoverpassword===codigo){
           res.send({
                message: "Codigo Verificado correctamente "
           })
        } else {
            res.send({
                message: "Codigo incorrecto"
            })
        }       
    } catch (error) {
        console.log('Error: No se pudo consultar los clientes ', error)
        res.status(500).json({
            message: 'Problemas al consultar cliente',
        })  
    }  
 }


 const getnewpassword = async (req,res) => {
    try {
        const pool = await getConnection()
        const {newpassword,Veripassword, Nit}  = req.body

        if(newpassword===Veripassword){
            const salt = bcryptjs.genSaltSync(10);
            const encryptpassword = bcryptjs.hashSync(newpassword, salt);
            const result = await pool
            .request()
            .input("Nit",Nit)
            .input("encryptpassword",encryptpassword)
            .query(tsqllogin.newpasword)
        res.send({
            message: "Contraseña actualizada"
        })
        } else {
            res.send({
                message: "La contraseña no coincide"
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
    GetUpdatePassword,
    getrecoverpassword,
    getsendmail,
    getnewpassword
}
      