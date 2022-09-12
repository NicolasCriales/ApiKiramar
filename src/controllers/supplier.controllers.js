import { getConnection, sql } from '../database/connection'
import { tsqlsupplier } from '../tsql'
import { pagination } from '../helpers/pagination'


const getsupplier = async (req,res) =>{
    try {
        const pool = await getConnection();
        const { page, limit } = req.query
        const result = await pool
                .request()
                .query(tsqlsupplier.supplier)

        if (result.rowsAffected[0] > 0) {
            let supplier = result.recordsets[0]
            supplier = await pagination(supplier, page, limit)
            res.send({
                supplier: supplier
            })
        } else {
            res.status(500).json({
                message: "No se encontro proveedores"
            })
        }
    } catch (error) {
        console.log('Error: no se pudo consultar los proveedores');
        res.status(500).json({
            message: 'Problema al consultar el producto'
        })
    }
}

const getcategorysupplier = async (req,res) =>{
    try {
        const pool = await getConnection();
        const { page, limit } = req.query
        const { CodProveedor } = req.body;
        const result = await pool
                .request()
                .input('CodProveedor', sql.VarChar, CodProveedor)
                .query(tsqlsupplier.categorysupplier)
        if (result.rowsAffected[0] > 0) {
            let supplier = result.recordsets[0]
            supplier = await pagination(supplier, page, limit)
            res.send({
                supplier: supplier
            })
        } else {
            res.status(500).json({
                message: "No se encontro categoria del proveedor"
            })
        }
    } catch (error) {
        console.log('Error: no se pudo consultar la categoria del proveedor');
        res.status(500).json({
            message: 'Problema al consultar la categoria del proveedor'
        })
    }
}

const getcodcategorysupplier = async (req,res) =>{
    try {
        const pool = await getConnection();
        const { page, limit } = req.query
        const { IdListaPrecios, CodProveedor, CodSubLinea } = req.body;
        const result = await pool
                .request()
                .input('IdListaPrecios', sql.VarChar, IdListaPrecios)
                .input('CodProveedor', sql.VarChar, CodProveedor)
                .input('CodSubLinea', sql.VarChar, CodSubLinea)
                .query(tsqlsupplier.codcategorysupplier)
        if (result.rowsAffected[0] > 0) {
            let supplier = result.recordsets[0]
            supplier = await pagination(supplier, page, limit)
            res.send({
                supplier: supplier
            })
        } else {
            res.status(500).json({
                message: "No se encontro codigo de  proveedores"
            })
        }
    } catch (error) {
        console.log('Error: no se pudo consultar el proveedor');
        res.status(500).json({
            message: 'Problema al consultar el proveedor'
        })
    }
}


const getcategorydkasa = async (req,res) =>{
    try {
        const pool = await getConnection();
        const { page, limit } = req.query
        const result = await pool
                .request()
                .query(tsqlsupplier.categorydkasa)
        if (result.rowsAffected[0] > 0) {
            let supplier = result.recordsets[0]
            supplier = await pagination(supplier, page, limit)
            res.send({
                supplier: supplier
            })
        } else {
            res.status(500).json({
                message: "No se encontro codigo de  proveedores"
            })
        }
    } catch (error) {
        console.log('Error: no se pudo consultar el proveedor');
        res.status(500).json({
            message: 'Problema al consultar el proveedor'
        })
    }
}

const getcategorydkasaproduct = async (req,res) =>{
    try {
        const pool = await getConnection();
        const { page, limit } = req.query
        const { IdListaPrecios, CodSubLinea } = req.body
        const result = await pool
                .request()
                .input('IdListaPrecios', sql.VarChar, IdListaPrecios)
                .input('CodSubLinea', sql.VarChar, CodSubLinea)
                .query(tsqlsupplier.categorydkasaproduc)
        if (result.rowsAffected[0] > 0) {
            let supplier = result.recordsets[0]
            supplier = await pagination(supplier, page, limit)
            res.send({
                supplier: supplier
            })
        } else {
            res.status(500).json({
                message: "No se encontro codigo de  proveedores"
            })
        }
    } catch (error) {
        console.log('Error: no se pudo consultar el proveedor');
        res.status(500).json({
            message: 'Problema al consultar el proveedor'
        })
    }
}


module.exports = {
    getsupplier,
    getcategorysupplier,
    getcodcategorysupplier,
    getcategorydkasa,
    getcategorydkasaproduct,
}