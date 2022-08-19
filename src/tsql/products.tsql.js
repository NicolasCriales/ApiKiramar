export const tsqlproducts = {
    getproducts:`
                    SELECT	AUX.IdArticulo, AUX.Codigo_Barras, AUX.NombreArticulo, AUX.NombreAlterno, AUX.CodProveedor, AUX.NombreProveedor,
                        AUX.CodLinea, AUX.NombreLinea, AUX.CodSubLinea, AUX.NombreSubLinea, AUX.CodTipoInv, AUX.TipoInventario, AUX.IdCategoria,
                        AUX.Descripcion, AUX.Inventario, aux.Descuento , AUX.IdListaPrecios ,AUX.BRUTO, AUX.Iva, AUX.PRECIO_VENTA 

                    FROM (
                            SELECT  MTA.IdArticulo, MTA.Codigo_Barras, MTA.NombreArticulo, MTA.NombreAlterno, MTA.CodProveedor, MTA.NombreProveedor, MTA.CodLinea,
                                    MTA.NombreLinea, MTA.CodSubLinea, MTA.NombreSubLinea, MTA.CodTipoInv, MTA.TipoInventario, MTA.Iva,
                                    MTA.IdCategoria, MTA.Descripcion, SAL.Disponible AS Inventario, LISTAP.IdListaPrecios ,
                                    convert(numeric(3,0),(LISTAP.DctoPromocional)) as Descuento,
                                    CONVERT(numeric(15,0),  ((LISTAP.Precio * ((100-LISTAP.DctoPromocional))/100) ))  AS BRUTO,
                                    CONVERT(numeric(15,0),((LISTAP.Precio * ((100-LISTAP.DctoPromocional))/100) ) * (1+(LISTAP.IVA / 100 ))) as PRECIO_VENTA
                            FROM    KellerDeskTop.[dbo].[MtArticulo] MTA
                                    INNER JOIN KellerDeskTop.[dbo].MtSaldo SAL ON SAL.IdArticulo = MTA.IdArticulo
                                    INNER JOIN KellerDeskTop.[dbo].MtListaPrecioArticulo LISTAP ON LISTAP.IdProducto = MTA.IdArticulo
                                    INNER JOIN MtSumini PROV ON PROV.CODSUMIN = MTA.CodProveedor
                                    INNER JOIN MtSubLinea SUBL ON SUBL.CODSUBLINEA = MTA.CodSubLinea
                            WHERE  SAL.IdBodega='1101' AND NOT MTA.NombreSubLinea='REPUESTOS' AND MTA.Habilitado='1'AND LISTAP.IdListaPrecios=@IdListaPrecios AND  
                                   PROV.SWACTIVO='1' AND PROV.SWappkiramar='1' AND NOT SUBL.NOMBRE='REPUESTOS'
                    )   AS AUX
                `,


    getproducts_individually:`
                                SELECT	AUX.IdArticulo, AUX.Codigo_Barras, AUX.NombreArticulo, AUX.NombreAlterno, AUX.CodProveedor, AUX.NombreProveedor,
                                        AUX.CodLinea, AUX.NombreLinea, AUX.CodSubLinea, AUX.NombreSubLinea, AUX.CodTipoInv, AUX.TipoInventario, AUX.IdCategoria,
                                        AUX.Descripcion, AUX.Inventario, aux.Descuento , AUX.IdListaPrecios, AUX.BRUTO, AUX.Iva, AUX.PRECIO_VENTA 

                                FROM (
                                        SELECT  MTA.IdArticulo, MTA.Codigo_Barras, MTA.NombreArticulo, MTA.NombreAlterno, MTA.CodProveedor, MTA.NombreProveedor, MTA.CodLinea,
                                                MTA.NombreLinea, MTA.CodSubLinea, MTA.NombreSubLinea, MTA.CodTipoInv, MTA.TipoInventario, MTA.Iva,
                                                MTA.IdCategoria, MTA.Descripcion, SAL.Disponible AS Inventario,LISTAP.IdListaPrecios, 
                                                convert(numeric(3,0),(LISTAP.DctoPromocional)) as Descuento,
                                                CONVERT(numeric(15,0),  ((LISTAP.Precio * ((100-LISTAP.DctoPromocional))/100) ))  AS BRUTO,
                                                CONVERT(numeric(15,0),((LISTAP.Precio * ((100-LISTAP.DctoPromocional))/100) ) * (1+(LISTAP.IVA / 100 ))) as PRECIO_VENTA
                                        FROM    MtArticulo MTA
                                                INNER JOIN MtSaldo SAL ON SAL.IdArticulo = MTA.IdArticulo
                                                INNER JOIN MtListaPrecioArticulo LISTAP ON LISTAP.IdProducto = MTA.IdArticulo
                                                INNER JOIN MtSumini PROV ON PROV.CODSUMIN = MTA.CodProveedor
                                                INNER JOIN MtSubLinea SUBL ON SUBL.CODSUBLINEA = MTA.CodSubLinea
                                        WHERE  SAL.IdBodega='1101' AND MTA.Habilitado='1'AND LISTAP.IdListaPrecios=@IdListaPrecios AND
                                               MTA.IdArticulo=@IdArticulo AND  PROV.SWACTIVO='1' AND PROV.SWappkiramar='1' AND NOT SUBL.NOMBRE='REPUESTOS'
                                )   AS AUX
                            `,
    
    getproducts_discount:`
                            SELECT	AUX.IdArticulo, AUX.Codigo_Barras, AUX.NombreArticulo, AUX.NombreAlterno, AUX.CodProveedor, AUX.NombreProveedor,
                                    AUX.CodLinea, AUX.NombreLinea, AUX.CodSubLinea, AUX.NombreSubLinea, AUX.CodTipoInv, AUX.TipoInventario, AUX.IdCategoria,
                                    AUX.Descripcion, AUX.Inventario, aux.Descuento , AUX.IdListaPrecios, AUX.BRUTO, AUX.Iva, AUX.PRECIO_VENTA 

                            FROM (
                                    SELECT  MTA.IdArticulo, MTA.Codigo_Barras, MTA.NombreArticulo, MTA.NombreAlterno, MTA.CodProveedor, MTA.NombreProveedor, MTA.CodLinea,
                                            MTA.NombreLinea, MTA.CodSubLinea, MTA.NombreSubLinea, MTA.CodTipoInv, MTA.TipoInventario, MTA.Iva,
                                            MTA.IdCategoria, MTA.Descripcion, SAL.Disponible AS Inventario, LISTAP.IdListaPrecios, 
                                            convert(numeric(3,0),(LISTAP.DctoPromocional)) as Descuento,
                                            CONVERT(numeric(15,0),  ((LISTAP.Precio * ((100-LISTAP.DctoPromocional))/100) ))  AS BRUTO,
                                            CONVERT(numeric(15,0),((LISTAP.Precio * ((100-LISTAP.DctoPromocional))/100) ) * (1+(LISTAP.IVA / 100 ))) as PRECIO_VENTA
                                    FROM    MtArticulo MTA
                                            INNER JOIN MtSaldo SAL ON SAL.IdArticulo = MTA.IdArticulo
                                            INNER JOIN MtListaPrecioArticulo LISTAP ON LISTAP.IdProducto = MTA.IdArticulo
                                            INNER JOIN MtSumini PROV ON PROV.CODSUMIN = MTA.CodProveedor
                                            INNER JOIN MtSubLinea SUBL ON SUBL.CODSUBLINEA = MTA.CodSubLinea
                                    WHERE  SAL.IdBodega='1101' AND MTA.Habilitado='1'AND LISTAP.IdListaPrecios=@IdListaPrecios AND 
                                           LISTAP.DctoPromocional > 0 AND  PROV.SWACTIVO='1' AND PROV.SWappkiramar='1'  AND NOT SUBL.NOMBRE='REPUESTOS'
                            )   AS AUX 
                        `,
}