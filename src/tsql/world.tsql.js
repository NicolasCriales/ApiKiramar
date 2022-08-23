export const tsqlworld = {
    world:  `
                select CODLINEA,NOMBRE , '' as URL_image
                from MtLinea
                where not CODLINEA='0'
            `,

    categoryworld: ` 
                        select DISTINCT SUBL.NOMBRE,MTA.CodSubLinea, mta.CodLinea , '' as URL_image
                        from MtArticulo MTA
                             INNER JOIN MtSubLinea SUBL ON SUBL.CODSUBLINEA = MTA.CodSubLinea
                         where MTA.CodLinea=@CODLINEA AND NOT SUBL.NOMBRE='REPUESTOS' and not MTA.CODSUBLINEA='0'
                    `,

    productcategory:`
                                SELECT	AUX.IdArticulo, AUX.Codigo_Barras, AUX.NombreArticulo, AUX.NombreAlterno, AUX.CodProveedor, AUX.NombreProveedor,
                                        AUX.CodLinea, AUX.NombreLinea, AUX.CodSubLinea, AUX.NombreSubLinea, AUX.CodTipoInv, AUX.TipoInventario, AUX.IdCategoria,
                                        AUX.Descripcion, AUX.Inventario, AUX.IdListaPrecios , AUX.BRUTO, aux.Descuento , aux.Precio_descuento, AUX.NETO_CON_DESCUENTO,
                                        AUX.NETO_SIN_DESCUENTO , AUX.Iva, aux.IVA_CON_DESCUENTO, AUX.IVA_SIN_DESCUENTO , AUX.PRECIO_CON_DESCUENTO, AUX.PRECIO_SIN_DESCUENTO,'' AS URL_Image
                                
                                FROM (
                                        SELECT  MTA.IdArticulo, MTA.Codigo_Barras, MTA.NombreArticulo, MTA.NombreAlterno, MTA.CodProveedor, MTA.NombreProveedor, MTA.CodLinea,
                                                MTA.NombreLinea, MTA.CodSubLinea, MTA.NombreSubLinea, MTA.CodTipoInv, MTA.TipoInventario, LISTAP.Iva,
                                                MTA.IdCategoria, MTA.Descripcion, SAL.Disponible AS Inventario, LISTAP.IdListaPrecios, 
                                                CONVERT(numeric(15,0),(LISTAP.Precio)) as BRUTO,
                                                CONVERT(numeric(3,0),(LISTAP.DctoPromocional)) as Descuento,
                                                CONVERT(numeric(15,0),((LISTAP.Precio)) -  ((LISTAP.Precio * ((100-LISTAP.DctoPromocional))/100) )) as Precio_descuento,  
                                                CONVERT(numeric(15,0),  ((LISTAP.Precio * ((100-LISTAP.DctoPromocional))/100) ))  AS NETO_CON_DESCUENTO,
                                                CONVERT(numeric(15,0),(LISTAP.Precio))  AS NETO_SIN_DESCUENTO,
                                                CONVERT(numeric(15,0), ((LISTAP.Precio * ((100-LISTAP.DctoPromocional))/100) ) * (1+(LISTAP.IVA / 100 )) - ((LISTAP.Precio * ((100-LISTAP.DctoPromocional))/100) )) as IVA_CON_DESCUENTO,
                                                CONVERT(numeric(15,0), ((LISTAP.Precio * ((100-LISTAP.DctoPromocional))/100) ) * (1+(LISTAP.IVA / 100 )) -  (LISTAP.Precio)   ) as IVA_SIN_DESCUENTO,
                                                CONVERT(numeric(15,0),((LISTAP.Precio * ((100-LISTAP.DctoPromocional))/100) ) * (1+(LISTAP.IVA / 100 ))) as PRECIO_CON_DESCUENTO,
                                                CONVERT(numeric(15,0),LISTAP.Precio   * (1+(LISTAP.IVA / 100 ))) as PRECIO_SIN_DESCUENTO
                                
                                        FROM    MtArticulo MTA
                                        INNER JOIN KellerDeskTop.[dbo].MtSaldo SAL ON SAL.IdArticulo = MTA.IdArticulo
                                        INNER JOIN KellerDeskTop.[dbo].MtListaPrecioArticulo LISTAP ON LISTAP.IdProducto = MTA.IdArticulo
                                        INNER JOIN MtSumini PROV ON PROV.CODSUMIN = MTA.CodProveedor
                                        INNER JOIN MtSubLinea SUBL ON SUBL.CODSUBLINEA = MTA.CodSubLinea
                                WHERE   SAL.IdBodega='1101' AND MTA.Habilitado='1' AND LISTAP.IdListaPrecios=@IdListaPrecios AND PROV.SWACTIVO='1' AND
                                        MTA.CodLinea=@CODLINEA AND MTA.CodSubLinea=@codcategory AND
                                        PROV.SWappkiramar='1' AND NOT SUBL.NOMBRE='REPUESTOS'
                         )   AS AUX
                `


}
