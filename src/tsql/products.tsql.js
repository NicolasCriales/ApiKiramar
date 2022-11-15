export const tsqlproducts = {
	getproducts: `
                    SELECT  AUX.IdArticulo, AUX.Codigo_Barras, AUX.NombreArticulo, AUX.NombreAlterno, AUX.CodProveedor, 
                            AUX.NombreProveedor,AUX.CodLinea, AUX.NombreLinea, AUX.CodSubLinea, AUX.NombreSubLinea, 
                            AUX.CodTipoInv, AUX.TipoInventario, AUX.IdCategoria,AUX.Descripcion, AUX.Inventario, 
                            AUX.IdListaPrecios , AUX.VALORUNIT, AUX.Iva, aux.DctoBase, aux.DctoPromocional , aux.CONDCTOPROMO,
                            AUX.DTOAUTORIZADO, AUX.CONDCTOAUTORIZADO, AUX.DctoCcial , AUX.CONDCTOCOMERCIAL, AUX.CONIVA, 
                            AUX.NETO_CON_DESCUENTO, AUX.NETO_SIN_DESCUENTO,AUX.IMAGEN

                            FROM (
                                    SELECT  MTA.IdArticulo, MTA.Codigo_Barras, MTA.NombreArticulo, MTA.NombreAlterno, 
                                            MTA.CodProveedor, MTA.NombreProveedor, MTA.CodLinea, MTA.NombreLinea, 
                                            MTA.CodSubLinea, MTA.NombreSubLinea,MTA.CodTipoInv, MTA.TipoInventario, 
                                            MTA.IdCategoria, MTA.Descripcion, SAL.Disponible AS Inventario, 
                                            LISTAP.IdListaPrecios, IMG.small_img as IMAGEN,
                                            CONVERT(numeric(15,0),(LISTAP.Precio)) as VALORUNIT,
                                            CONVERT(numeric(15,0),(LISTAP.IVA)) as IVA,
                                            CONVERT(numeric(3,0),(LISTAP.DctoBase)) as DctoBase,
                                            CONVERT(numeric(3,0),(LISTAP.DctoPromocional)) as DctoPromocional,
                                            CONVERT(numeric(15,0),((LISTAP.Precio * ((100-LISTAP.DctoPromocional))/100) 
                                                    )) as CONDCTOPROMO,  
                                            CONVERT(numeric(15,0),(LISTAP.DctoCcial - LISTAP.DctoCcial 
                                                    ))  AS DTOAUTORIZADO,
                                            CONVERT(numeric(15,0),((LISTAP.Precio * ((100-LISTAP.DctoPromocional))/100) 
                                                    ))   AS CONDCTOAUTORIZADO,
                                            CONVERT(numeric(15,0),(LISTAP.DctoCcial))  AS DctoCcial,
                                            CONVERT(numeric(15,0),((LISTAP.Precio * ((100-LISTAP.DctoPromocional))/100) ) * 
                                                    ((100-LISTAP.DctoCcial)/100)) AS CONDCTOCOMERCIAL,
                                            CONVERT(numeric(15,0),(((LISTAP.Precio * ((100-LISTAP.DctoPromocional))/100) ) * 
                                                    ((100-LISTAP.DctoCcial)/100))   *  ((LISTAP.IVA / 100 ))   ) AS CONIVA,
                                            CONVERT(numeric(15,0),(((LISTAP.Precio * ((100-LISTAP.DctoPromocional))/100) ) * 
                                                    ((100-LISTAP.DctoCcial)/100))   *  (1+(LISTAP.IVA / 100 ))   
                                                    ) AS NETO_CON_DESCUENTO,
                                            CONVERT(numeric(15,0),LISTAP.Precio  * (1+(LISTAP.IVA / 100 ))) as NETO_SIN_DESCUENTO

                                        FROM    MtArticulo MTA
                                                INNER JOIN MtSaldo SAL ON SAL.IdArticulo = MTA.IdArticulo
                                                INNER JOIN MtListaPrecioArticulo LISTAP ON LISTAP.IdProducto = MTA.IdArticulo
                                                INNER JOIN MtSumini PROV ON PROV.CODSUMIN = MTA.CodProveedor
                                                INNER JOIN MtSubLinea SUBL ON SUBL.CODSUBLINEA = MTA.CodSubLinea
                                                LEFT JOIN MtArticuloImagen  IMG on IMG.IdArticulo = mta.IdArticulo                

                                        WHERE   SAL.IdBodega='1101' AND MTA.Habilitado='1'AND LISTAP.IdListaPrecios=@IdListaPrecios AND  
                                                PROV.SWACTIVO='1' AND PROV.SWappkiramar='1' AND SAL.Disponible > 30 AND NOT SUBL.NOMBRE='REPUESTOS' AND IMG.item_order ='0'
                                )   AS AUX
                            `,

	getproducts_individually: `
                                SELECT	AUX.IdArticulo, AUX.Codigo_Barras, AUX.NombreArticulo, AUX.NombreAlterno, 
                                        AUX.CodProveedor, AUX.NombreProveedor,AUX.CodLinea, AUX.NombreLinea, AUX.CodSubLinea, 
                                        AUX.NombreSubLinea, AUX.CodTipoInv, AUX.TipoInventario, AUX.IdCategoria,AUX.Descripcion,
                                        AUX.Inventario, AUX.IdListaPrecios , AUX.VALORUNIT, AUX.Iva, aux.DctoBase, 
                                        aux.DctoPromocional , aux.CONDCTOPROMO,AUX.DTOAUTORIZADO, AUX.CONDCTOAUTORIZADO, 
                                        AUX.DctoCcial , AUX.CONDCTOCOMERCIAL, AUX.CONIVA, AUX.NETO_CON_DESCUENTO, AUX.NETO_SIN_DESCUENTO,
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
                                                                MTA.IdArticulo=@IdArticulo AND PROV.SWACTIVO='1' AND PROV.SWappkiramar='1' AND NOT SUBL.NOMBRE='REPUESTOS' AND
                                                                IMG.item_order ='0'
                                                )       AS AUX
                                        `,

	getproducts_discount: `
                                        SELECT	AUX.IdArticulo, AUX.Codigo_Barras, AUX.NombreArticulo, AUX.NombreAlterno, AUX.CodProveedor, AUX.NombreProveedor,
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
                                                WHERE  SAL.IdBodega='1101' AND MTA.Habilitado='1'AND LISTAP.IdListaPrecios=@IdListaPrecios AND 
                                                       LISTAP.DctoPromocional > 0 AND  PROV.SWACTIVO='1' AND PROV.SWappkiramar='1' AND SAL.Disponible > 30  AND NOT SUBL.NOMBRE='REPUESTOS' AND
                                                       IMG.item_order ='0'
                                        )   AS AUX 
                                `,

	getproducts_lastunits: `   
                                        SELECT	AUX.IdArticulo, AUX.Codigo_Barras, AUX.NombreArticulo, AUX.NombreAlterno, AUX.CodProveedor, AUX.NombreProveedor,
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
                                                        LEFT JOIN MtArticuloImagen  IMG on IMG.IdArticulo = MTA.IdArticulo
                                                        WHERE  SAL.IdBodega='1101' AND MTA.Habilitado='1'AND LISTAP.IdListaPrecios=@IdListaPrecios AND 
                                                               sal.Disponible > 30 AND sal.Disponible < 50      AND  PROV.SWACTIVO='1' AND PROV.SWappkiramar='1'  AND NOT SUBL.NOMBRE='REPUESTOS' AND
                                                               IMG.item_order ='0'
                                        )   AS AUX 
                        `,

	getproducts_recommends: `       
                                SELECT	TOP 20 AUX.IdArticulo, AUX.Codigo_Barras, AUX.NombreArticulo, AUX.NombreAlterno, AUX.CodProveedor, AUX.NombreProveedor,
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
                                                LEFT JOIN MtArticuloImagen  IMG on IMG.IdArticulo = MTA.IdArticulo
                                        WHERE   SAL.IdBodega='1101' AND MTA.Habilitado='1'AND LISTAP.IdListaPrecios=@IdListaPrecios AND 
                                                MTA.CodLinea=@Codlinea AND MTA.CodSubLinea=@CodSubLinea AND  PROV.SWACTIVO='1' AND SAL.Disponible > 30  AND PROV.SWappkiramar='1'  AND NOT SUBL.NOMBRE='REPUESTOS' AND
                                                IMG.item_order ='0'
                                )   AS AUX
                        `,

	getBest_sellers: `
          
                        SELECT  DISTINCT TOP 15( AUX.IdArticulo), AUX.Codigo_Barras, AUX.NombreArticulo, AUX.NombreAlterno, AUX.CodProveedor, AUX.NombreProveedor,
                                AUX.CodLinea, AUX.NombreLinea, AUX.CodSubLinea, AUX.NombreSubLinea, AUX.CodTipoInv, AUX.TipoInventario, AUX.IdCategoria,
                                AUX.Descripcion, AUX.Inventario, AUX.IdListaPrecios , AUX.VALORUNIT, AUX.Iva, aux.DctoBase, aux.DctoPromocional , aux.CONDCTOPROMO,
                                AUX.DTOAUTORIZADO, AUX.CONDCTOAUTORIZADO, AUX.DctoCcial , AUX.CONDCTOCOMERCIAL, AUX.CONIVA, AUX.NETO_CON_DESCUENTO, AUX.NETO_SIN_DESCUENTO,
                                AUX.IMAGEN, aux.fecha
                        FROM (
                                SELECT  MTA.IdArticulo, MTA.Codigo_Barras, MTA.NombreArticulo, MTA.NombreAlterno, MTA.CodProveedor, MTA.NombreProveedor, MTA.CodLinea,
                                        MTA.NombreLinea, MTA.CodSubLinea, MTA.NombreSubLinea, MTA.CodTipoInv, MTA.TipoInventario, 
                                        MTA.IdCategoria, MTA.Descripcion, SAL.Disponible AS Inventario, LISTAP.IdListaPrecios, IMG.small_img as IMAGEN,
                                        TRADE.FECHA,
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
                                        INNER JOIN MVtrade MVT ON MVT.PRODUCTO = MTA.IdArticulo
                                        INNER JOIN trade trade ON trade.NRODCTO = MVT.NRODCTO
                                        LEFT JOIN MtArticuloImagen  IMG on IMG.IdArticulo = mta.IdArticulo                                                                                              
                                WHERE   SAL.IdBodega='1101' AND MTA.Habilitado='1'AND LISTAP.IdListaPrecios=@IdListaPrecios AND  
                                PROV.SWACTIVO='1' AND PROV.SWappkiramar='1' AND SAL.Disponible > 30 AND NOT SUBL.NOMBRE='REPUESTOS' AND IMG.item_order ='0'
                        ) AS AUX ORDER BY AUX.FECHA DESC

                        
                `,

	calificacion: `
                    select ((sum(calificacion) ) /  (count (idproducto)))  AS calificación 
                    from mvResena 
                    where idproducto=@IdArticulo
                `,
};
