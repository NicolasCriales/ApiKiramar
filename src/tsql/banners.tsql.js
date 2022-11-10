export const tsqlbanners = {
  banners: `
                    select imagen,ruta,orden,swInactivo,swDkasa,swKiramar,codproveedor, idzonas,is_video, Titulo
                    from MtBanners 
                    where swInactivo='0' AND swKiramar='1' AND swDkasa='0' AND orden >= 1 AND idzonas=@id
                `,
                idbanners: `select id, descripcion from MTBannerZonas`,

  products_banners: `
                                SELECT  AUX.IdArticulo, AUX.Codigo_Barras, AUX.NombreArticulo, AUX.NombreAlterno, AUX.CodProveedor, AUX.NombreProveedor,
                                        AUX.CodLinea, AUX.NombreLinea, AUX.CodSubLinea, AUX.NombreSubLinea, AUX.CodTipoInv, AUX.TipoInventario, AUX.IdCategoria,
                                        AUX.Descripcion, AUX.Inventario, AUX.IdListaPrecios , AUX.VALORUNIT, AUX.Iva, aux.DctoBase, aux.DctoPromocional , aux.CONDCTOPROMO,
                                        AUX.DTOAUTORIZADO, AUX.CONDCTOAUTORIZADO, AUX.DctoCcial , AUX.CONDCTOCOMERCIAL, AUX.CONIVA, AUX.NETO_CON_DESCUENTO, AUX.NETO_SIN_DESCUENTO,
                                        AUX.IMAGEN, aux.FecIng

                                FROM (
                                        SELECT  MTA.IdArticulo, MTA.Codigo_Barras, MTA.NombreArticulo, MTA.NombreAlterno, MTA.CodProveedor, MTA.NombreProveedor, MTA.CodLinea,
                                                MTA.NombreLinea, MTA.CodSubLinea, MTA.NombreSubLinea, MTA.CodTipoInv, MTA.TipoInventario, 
                                                MTA.IdCategoria, MTA.Descripcion, SAL.Disponible AS Inventario, LISTAP.IdListaPrecios, IMG.small_img as IMAGEN, MTA.FecIng,
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

                                WHERE   SAL.IdBodega='1101' AND MTA.Habilitado='1'AND LISTAP.IdListaPrecios=@IdListaPrecios AND  
                                        MTA.NombreAlterno LIKE @LikeNombreAlterno  AND
                                        PROV.SWACTIVO='1' AND PROV.SWappkiramar='1' and not mta.NombreAlterno like '%gratis%'
                           
    
                        `,

                        category: `
                        SELECT	AUX.CodSubLinea, AUX.NombreSubLinea
        FROM   (
        select DISTINCT  (MTA.CodSubLinea), MTA.NombreSubLinea
        from    MtArticulo MTA
        INNER JOIN KellerDeskTop.[dbo].MtSaldo SAL ON SAL.IdArticulo = MTA.IdArticulo
        INNER JOIN KellerDeskTop.[dbo].MtListaPrecioArticulo LISTAP ON LISTAP.IdProducto = MTA.IdArticulo
        INNER JOIN MtSumini PROV ON PROV.CODSUMIN = MTA.CodProveedor
        INNER JOIN MtSubLinea SUBL ON SUBL.CODSUBLINEA = MTA.CodSubLinea
        LEFT JOIN MtArticuloImagen  IMG on IMG.IdArticulo = MTA.IdArticulo
        WHERE   SAL.IdBodega='1101' AND MTA.Habilitado='1'AND LISTAP.IdListaPrecios=@IdListaPrecios AND  
        MTA.NombreAlterno LIKE @LikeNombreAlterno AND prov.CODSUMIN=@LikeCodProveedor and
        PROV.SWACTIVO='1' AND PROV.SWappkiramar='1' and not mta.NombreAlterno like '%gratis%') aux `,

        max_min: `
        SELECT	MAX(aux.NETO_CON_DESCUENTO) AS MAX, MIN(aux.NETO_CON_DESCUENTO) AS MIN 

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
                        INNER JOIN KellerDeskTop.[dbo].MtSaldo SAL ON SAL.IdArticulo = MTA.IdArticulo
                        INNER JOIN KellerDeskTop.[dbo].MtListaPrecioArticulo LISTAP ON LISTAP.IdProducto = MTA.IdArticulo
                        INNER JOIN MtSumini PROV ON PROV.CODSUMIN = MTA.CodProveedor
                        INNER JOIN MtSubLinea SUBL ON SUBL.CODSUBLINEA = MTA.CodSubLinea
                        LEFT JOIN MtArticuloImagen  IMG on IMG.IdArticulo = MTA.IdArticulo

                        WHERE   SAL.IdBodega='1101' AND MTA.Habilitado='1'AND LISTAP.IdListaPrecios=@IdListaPrecios AND  
                        MTA.NombreAlterno LIKE @LikeNombreAlterno AND
                        PROV.SWACTIVO='1' AND PROV.SWappkiramar='1' and not mta.NombreAlterno like '%gratis%' `,


        supplier: `SELECT	AUX.NombreProveedor, AUX.CodProveedor
        FROM    (
                        SELECT DISTINCT (MTA.NombreProveedor), MTA.CodProveedor
                        FROM    MtArticulo MTA
                                INNER JOIN KellerDeskTop.[dbo].MtSaldo SAL ON SAL.IdArticulo = MTA.IdArticulo
                                INNER JOIN KellerDeskTop.[dbo].MtListaPrecioArticulo LISTAP ON LISTAP.IdProducto = MTA.IdArticulo
                                INNER JOIN MtSumini PROV ON PROV.CODSUMIN = MTA.CodProveedor
                                INNER JOIN MtSubLinea SUBL ON SUBL.CODSUBLINEA = MTA.CodSubLinea
                                LEFT JOIN MtArticuloImagen  IMG on IMG.IdArticulo = MTA.IdArticulo
                                WHERE   SAL.IdBodega='1101' AND MTA.Habilitado='1'AND LISTAP.IdListaPrecios=@IdListaPrecios AND  
                                MTA.NombreAlterno LIKE @LikeNombreAlterno AND
                                PROV.SWACTIVO='1' AND PROV.SWappkiramar='1' and not mta.NombreAlterno like '%gratis%'
                                 ) AUX

                                `,

  banners_releases: `
                            select imagen,ruta,orden,swInactivo,swDkasa,swKiramar,codproveedor
                            from MtBanners 
                            where swInactivo='0' AND swKiramar='1' AND swDkasa='0' and idzona='2'
                        `,

  products_new: `
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

                        
                            WHERE   SAL.IdBodega='1101' AND MTA.Habilitado='1'AND LISTAP.IdListaPrecios=@IdListaPrecios AND  
                                    FecIng  >= DATEADD(day, -180, getdate()) AND MTA.CodProveedor=@CodProveedor AND
                                    PROV.SWACTIVO='1' AND PROV.SWappkiramar='1' AND NOT SUBL.NOMBRE='REPUESTOS'
                        )   AS AUX

                    `,
};
