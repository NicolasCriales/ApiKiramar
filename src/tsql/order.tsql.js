export const tsqlorder = {
  orderb2b: `
                        
                        select  CodVendedor,Nit,TipoDcto,NroDcto,FechaDcto,FechaVencimiento,Dias,Deuda , 
                        CASE 
                                WHEN Dias > 0 THEN 'MORA'
                                WHEN Dias < 0 THEN 'PENDIENTE'
                        END
                        AS Estado
                        from    MtEstadoCartera 
                        where    NIT=@Nit 
                `,

  factureb2b: `
                        select  nombre,cantidad,producto,
                                CONVERT(numeric(10,0),  ((valorunit * ((100-descuento))/100) ))  AS Total
                        from    mvtrade
                        where   TIPODCTO=@Tipodcto and NRODCTO=@Nrodcto
                        

                `,

                /*
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
            `,*/

  pedido: `
  select pedido.FECHA,pedido.TOTALIVA + pedido.NETO as Total,pedido.ESTADOPED, estado.Estado, pedido.direccion
  from MtPedido pedido
  inner join MtEstadoPedido estado on estado.idestadopedido = pedido.ESTADOPED
                where pedido.TIPODCTO='PM' AND pedido.NIT=@Nit
        `,

        pedido_detail: `
        select pedido.TIPODCTO + '-' + pedido.NRODCTO as Npedido,pedido.FECHA,pedido.TOTALIVA + pedido.NETO as Total,pedido.ESTADOPED, estado.Estado, pedido.direccion, pedido.nit
       
        from MtPedido pedido
        inner join MtEstadoPedido estado on estado.idestadopedido = pedido.ESTADOPED
                      where pedido.TIPODCTO='PM' AND pedido.NIT=@Nit and NRODCTO=@NRODCTO and TIPODCTO=@TIPODCTO `,

                      pedido_detail1: `
                      select  articulo.NombreAlterno, pedido.CANTIDAD, pedido.PRODUCTO, pedido.NETO
                      from MvPedido  pedido     
                                                      inner join  MtArticulo articulo on articulo.IdArticulo = pedido.PRODUCTO
                                 where pedido.NRODCTO=@NRODCTO and pedido.TIPODCTO=@TIPODCTO    

        `,

        facture_detailfech: `
                                 select  FechaDcto,FechaVencimiento,Dias ,  deuda,
                                        CASE 
                                                WHEN Dias > 0 THEN 'MORA'
                                                  WHEN Dias < 0 THEN 'PENDIENTE'
                                        END
                                AS Estado
                                from    MtEstadoCartera 
                                where   NRODCTO=@NRODCTO and TIPODCTO=@TIPODCTO  
         `,


         status: `
                update MtPedido
                        set ESTADOPED=@ESTADOPED
                        where  NRODCTO=@NRODCTO AND TIPODCTO=@TIPODCTO`,


        NRODCTO: `
                select Id,ConsecutPedAPKBq, ConsecutPedAPKNq 
                from MtConsecutivoTipoDcto
`,
mtprocli: `
                select * from MtCliente where nit =@NIT`,


        DatosEnvio: `select pedido.direccion, pedido.ciudad, pedido.codciudad, pedido.NETO + pedido.TOTALIVA as Total, pedido.ESTADOPED,estado.Estado, TIPODCTO + '-' + NRODCTO AS ReferenciaPedido
        from MtPedido pedido
        inner join MtEstadoPedido estado on estado.IdEstadoPedido = pedido.ESTADOPED
        where pedido.TIPODCTO=@Tipodcto and pedido.nrodcto=@nrodcto
                `,
        DatosCliente: `select Nombre,Nit, Celular, Email from MtCliente where Nit =@Nit`,

        TotalArticulos: `select PRODUCTO,Tipodcto,nrodcto from MvPedido  where TIPODCTO=@Tipodcto and nrodcto=@nrodcto`,


        DetalleTransacción: `select '' as MetodoPago, '' as Motivo, '' as ReferenciaTransaccion from MtCliente where nit =@NIT `

};

