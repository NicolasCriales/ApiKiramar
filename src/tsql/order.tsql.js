export const tsqlorder = {
    orderb2b: `
                select 
                        pedido.TIPODCTO, pedido.NRODCTO, pedido.FECHA, pedido.NIT, pedido.BRUTO, pedido.DESCUENTO, pedido.TOTALIVA, pedido.NETO, estado.Estado , pedido.NROFACTURA, pedido.FECHAFACT 
                from    MtPedido as pedido
                        INNER JOIN MtEstadoPedido Estado on estado.IdEstadoPedido =pedido.ESTADOPED
                where   fecha >= DATEADD([month], DATEDIFF([month], '19000101', GETDATE()) - 3, '19000101') AND 
                        fecha < DATEADD([month], DATEDIFF([month], '19000101', GETDATE()), '19000101') AND
                        pedido.NIT=@Nit 
            `,

    factureb2b: `
                    select 
                        TIPODCTO, NRODCTO, PRODUCTO, CANTIDAD, CANTORIG, VALORUNIT,IVA,DTOBASE,CONDCTOPROMO, DTOAUTORIZADO,
                        CONDCTOAUTORIZADO, DTOCCIAL, CONDCTOCOMERCIAL, CONIVA,NETO
                    from MvPedido
                    where  TIPODCTO=@Tipodcto and NRODCTO=@Nrodcto

                `,

    orderb2c: `
                select 
                        pedido.TIPODCTO, pedido.NRODCTO, pedido.FECHA, pedido.NIT, pedido.BRUTO, pedido.DESCUENTO, pedido.TOTALIVA, pedido.NETO, estado.Estado , pedido.NROFACTURA, pedido.FECHAFACT 
                from    MtPedido as pedido
                        INNER JOIN MtEstadoPedido Estado on estado.IdEstadoPedido =pedido.ESTADOPED
                where   fecha >= DATEADD([month], DATEDIFF([month], '19000101', GETDATE()) - 3, '19000101') AND 
                        fecha < DATEADD([month], DATEDIFF([month], '19000101', GETDATE()), '19000101') AND
                        pedido.NIT=@Nit
            `,


    factureb2c: `
                    select 
                        TIPODCTO, NRODCTO, PRODUCTO, CANTIDAD, CANTORIG, VALORUNIT,IVA,DTOBASE,CONDCTOPROMO, DTOAUTORIZADO,
                        CONDCTOAUTORIZADO, DTOCCIAL, CONDCTOCOMERCIAL, CONIVA,NETO
                    from MvPedido
                    where  TIPODCTO=@Tipodcto and NRODCTO=@Nrodcto 
            `,


}
