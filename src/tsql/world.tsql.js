export const tsqlworld = {
  world: `
               	select CODLINEA,NOMBRE , 'https://dkasa.com.co/media/Imageneskiramar/mundos/' + CODLINEA + '.jpg' AS IMAGEN
                from MtLinea
                where not CODLINEA='0'
            `,

  categoryworld: ` 
                        select DISTINCT SUBL.NOMBRE,MTA.CodSubLinea
                        from MtArticulo MTA
                             INNER JOIN MtSubLinea SUBL ON SUBL.CODSUBLINEA = MTA.CodSubLinea
                         where MTA.CodLinea=@CODLINEA AND NOT SUBL.NOMBRE='REPUESTOS' and not MTA.CODSUBLINEA='0' order by SUBL.NOMBRE asc
                    `,

  productcategory: `
                                SELECT  AUX.IdArticulo, AUX.Codigo_Barras, AUX.NombreArticulo, AUX.NombreAlterno, AUX.CodProveedor, AUX.NombreProveedor,
                                        AUX.CodLinea, AUX.NombreLinea, AUX.CodSubLinea, AUX.NombreSubLinea, AUX.CodTipoInv, AUX.TipoInventario, AUX.IdCategoria,
                                        AUX.Descripcion, AUX.Inventario, AUX.IdListaPrecios , AUX.VALORUNIT, AUX.Iva, aux.DctoBase, aux.DctoPromocional , aux.CONDCTOPROMO,
                                        AUX.DTOAUTORIZADO, AUX.CONDCTOAUTORIZADO, AUX.DctoCcial , AUX.CONDCTOCOMERCIAL, AUX.CONIVA, AUX.NETO_CON_DESCUENTO, AUX.NETO_SIN_DESCUENTO,
                                        AUX.IMAGEN

                                 FROM (
                                        SELECT  MTA.IdArticulo, MTA.Codigo_Barras, MTA.NombreArticulo, MTA.NombreAlterno, MTA.CodProveedor, MTA.NombreProveedor, MTA.CodLinea,
                                                MTA.NombreLinea, MTA.CodSubLinea, MTA.NombreSubLinea, MTA.CodTipoInv, MTA.TipoInventario, 
                                                MTA.IdCategoria, MTA.Descripcion, SAL.Disponible AS Inventario, LISTAP.IdListaPrecios, IMG.small_img as IMAGEN,
                                                CONVERT(numeric(15,0),(LISTAP.Precio)) as VALORUNIT,
                                                CONVERT(numeric(15,0),(LISTAP.IVA)) as IVA,
                                                CONVERT(numeric(3,0),(LISTAP.DctoBase)) as DctoBase,
                                                CONVERT(numeric(3,0),(LISTAP.DctoPromocional)) as DctoPromocional,
                                                CONVERT(numeric(15,0),((LISTAP.Precio * ((100-LISTAP.DctoPromocional))/100) )) as CONDCTOPROMO,  
                                                CONVERT(numeric(15,0),(LISTAP.DctoCcial - LISTAP.DctoCcial ))  AS DTOAUTORIZADO,
                                                CONVERT(numeric(15,0),((LISTAP.Precio * ((100-LISTAP.DctoPromocional))/100) ))   AS CONDCTOAUTORIZADO,
                                                CONVERT(numeric(15,0),(LISTAP.DctoCcial))  AS DctoCcial,
                                                CONVERT(numeric(15,0),((LISTAP.Precio * ((100-LISTAP.DctoPromocional))/100) ) * ((100-LISTAP.DctoCcial)/100)) AS CONDCTOCOMERCIAL,
                                                CONVERT(numeric(15,0),(((LISTAP.Precio * ((100-LISTAP.DctoPromocional))/100) ) * ((100-LISTAP.DctoCcial)/100))   *  ((LISTAP.IVA / 100 ))   ) AS CONIVA,
                                                CONVERT(numeric(15,0),(((LISTAP.Precio * ((100-LISTAP.DctoPromocional))/100) ) * ((100-LISTAP.DctoCcial)/100))   *  (1+(LISTAP.IVA / 100 ))   ) AS NETO_CON_DESCUENTO,
                                                CONVERT(numeric(15,0),LISTAP.Precio   * (1+(LISTAP.IVA / 100 ))) as NETO_SIN_DESCUENTO

                                                FROM    MtArticulo MTA
                                                        INNER JOIN MtSaldo SAL ON SAL.IdArticulo = MTA.IdArticulo
                                                        INNER JOIN MtListaPrecioArticulo LISTAP ON LISTAP.IdProducto = MTA.IdArticulo
                                                        INNER JOIN MtSumini PROV ON PROV.CODSUMIN = MTA.CodProveedor
                                                        INNER JOIN MtSubLinea SUBL ON SUBL.CODSUBLINEA = MTA.CodSubLinea
                                                        LEFT JOIN MtArticuloImagen  IMG on IMG.IdArticulo = mta.IdArticulo 

                                                WHERE   SAL.IdBodega='1101' AND MTA.Habilitado='1' AND LISTAP.IdListaPrecios=@IdListaPrecios AND PROV.SWACTIVO='1' AND
                                                        MTA.CodLinea=@CODLINEA AND MTA.CodSubLinea=@codcategory AND
                                                        PROV.SWappkiramar='1'  AND SAL.Disponible > 30 AND NOT SUBL.NOMBRE='REPUESTOS'
                                )   AS AUX
                `,
};
