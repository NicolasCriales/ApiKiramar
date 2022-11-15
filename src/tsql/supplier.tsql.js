export const tsqlsupplier = {
  supplier: `
                select RTRIM(CODSUMIN) as CODSUMIN, RTRIM(NOMBRE) as NOMBRE, '' as URL_Image
                from MtSumini 
                where swactivo='1' and swappkiramar='1'  and not swappdkasa='1' and not CODSUMIN='1440'
    `,

  categorysupplier: `
                        

	select DISTINCT subl.NOMBRE,subl.CODSUBLINEA
        from MtArticulo  art
                                        inner join MtSubLinea subl on subl.CODSUBLINEA = art.CodSubLinea
                                        inner join MtSaldo    sal  on art.idarticulo = sal.IdArticulo and sal.Saldo > 0 and sal.IdBodega = '1101'
        where art.Habilitado='1' and art.CodProveedor=@CodProveedor and not subl.CodSubLinea in ('1070', '1052', '1049') order by subl.NOMBRE ASC 

                    `,

  codcategorysupplier: `
                                        SELECT  AUX.IdArticulo, AUX.Codigo_Barras, AUX.NombreArticulo, AUX.NombreAlterno, AUX.CodProveedor, AUX.NombreProveedor,
                                                AUX.CodLinea, AUX.NombreLinea, AUX.CodSubLinea, AUX.NombreSubLinea, AUX.CodTipoInv, AUX.TipoInventario, AUX.IdCategoria,
                                                AUX.Descripcion, AUX.Inventario, AUX.IdListaPrecios , AUX.VALORUNIT, AUX.Iva, aux.DctoBase, aux.DctoPromocional , aux.CONDCTOPROMO,
                                                AUX.DTOAUTORIZADO, AUX.CONDCTOAUTORIZADO, AUX.DctoCcial , AUX.CONDCTOCOMERCIAL, AUX.CONIVA, AUX.NETO_CON_DESCUENTO, AUX.NETO_SIN_DESCUENTO,
                                                AUX.IMAGEN

                                        FROM (
                                                SELECT  MTA.IdArticulo, MTA.Codigo_Barras, MTA.NombreArticulo, MTA.NombreAlterno, MTA.CodProveedor, MTA.NombreProveedor, MTA.CodLinea,
                                                        MTA.NombreLinea, MTA.CodSubLinea, SUBL.Nombre as NombreSubLinea, MTA.CodTipoInv, MTA.TipoInventario, 
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

                                                 WHERE   SAL.IdBodega='1101' AND NOT MTA.NombreSubLinea='REPUESTOS' AND MTA.Habilitado='1'AND LISTAP.IdListaPrecios=@IdListaPrecios AND 
                                                         MTA.CodProveedor=@CodProveedor AND MTA.CodSubLinea=@CodSubLinea  AND PROV.SWACTIVO='1'  AND SAL.Disponible > 30 AND PROV.SWappkiramar='1' AND NOT SUBL.NOMBRE='REPUESTOS'
                                          )   AS AUX
                        `,

  categorydkasa: `
                    select DISTINCT NombreSubLinea,CodSubLinea 
                    from MtArticulo 
                    where NombreProveedor='dkasa' and not CodSubLinea='1070' and not NombreSubLinea='repuestos'

                `,

  categorydkasaproduc: `
                                        SELECT  AUX.IdArticulo, AUX.Codigo_Barras, AUX.NombreArticulo, AUX.NombreAlterno, AUX.CodProveedor, AUX.NombreProveedor,
                                                AUX.CodLinea, AUX.NombreLinea, AUX.CodSubLinea, AUX.NombreSubLinea, AUX.CodTipoInv, AUX.TipoInventario, AUX.IdCategoria,
                                                AUX.Descripcion, AUX.Inventario, AUX.IdListaPrecios , AUX.VALORUNIT, AUX.Iva, aux.DctoBase, aux.DctoPromocional , aux.CONDCTOPROMO,
                                                AUX.DTOAUTORIZADO, AUX.CONDCTOAUTORIZADO, AUX.DctoCcial , AUX.CONDCTOCOMERCIAL, AUX.CONIVA, AUX.NETO_CON_DESCUENTO, AUX.NETO_SIN_DESCUENTO,
                                                AUX.IMAGEN

                                        FROM (
                                                SELECT  MTA.IdArticulo, MTA.Codigo_Barras, MTA.NombreArticulo, MTA.NombreAlterno, MTA.CodProveedor, MTA.NombreProveedor, MTA.CodLinea,
                                                        MTA.NombreLinea, MTA.CodSubLinea, SUBL.Nombre as  NombreSubLinea, MTA.CodTipoInv, MTA.TipoInventario, 
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

                                                        WHERE   SAL.IdBodega='1101' AND NOT MTA.NombreSubLinea='REPUESTOS' AND MTA.Habilitado='1'AND LISTAP.IdListaPrecios=@IdListaPrecios AND 
                                                                MTA.NombreProveedor='DKASA' AND MTA.CodSubLinea=@CodSubLinea  AND PROV.SWACTIVO='1' AND SAL.Disponible > 30 AND PROV.SWappkiramar='1' AND NOT SUBL.NOMBRE='REPUESTOS'
                                        )   AS AUX                
                        `,
};
