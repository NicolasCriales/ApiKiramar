import { getConnection, sql } from "../database/connection";
import { tsqlcreateuser } from "../tsql";
import { express } from "express";
import bcryptjs from "bcryptjs";

const createuser = async (req, res) => {
  try {
    const pool = await getConnection();
    const {
      Nit,
      Nombre,
      CodCiudad,
      Ciudad,
      Direccion,
      Telefono,
      Celular,
      Email,
      password,
    } = req.body;
    const result = await pool
      .request()
      .input("Email", sql.VarChar, Email)
      .input("Nit", sql.VarChar, Nit)
      .query(tsqlcreateuser.verify_existence);
    if (result.rowsAffected[0] > 0) {
      res.send({
        productcategory: "El usuario ya existe",
      });
    } else {
      const salt = bcryptjs.genSaltSync(10);
      const encryptpassword = bcryptjs.hashSync(password, salt);
      console.log(encryptpassword);
      const result2 = await pool
        .request()
        .input("Nit", sql.VarChar, Nit)
        .input("Nombre", sql.VarChar, Nombre)
        .input("CodCiudad", sql.VarChar, CodCiudad)
        .input("Ciudad", sql.VarChar, Ciudad)
        .input("Direccion", sql.VarChar, Direccion)
        .input("Telefono", sql.VarChar, Telefono)
        .input("Celular", sql.VarChar, Celular)
        .input("Email", sql.VarChar, Email)
        .input("encryptpassword", sql.VarChar, encryptpassword)
        .query(tsqlcreateuser.createuser);
      res.send({
        result: "Se creo el usuario correctamente",
        result2,
      });
    }
  } catch (error) {
    console.log(
      "Error: No se pudo crear el usuario por error de consulta",
      error
    );
    res.status(500).json({
      message: "Problemas al crear el usuario por la consulta",
    });
  }
};

module.exports = {
  createuser,
};
