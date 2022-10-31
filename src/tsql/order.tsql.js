export const tsqlorder = {
  orderb2b: `
                        
                        select  CodVendedor,Nit,TipoDcto,NroDcto,FechaDcto,FechaVencimiento,Dias,Deuda , 
                        CASE 
                                WHEN Dias > 0 THEN 'MORA'
                                WHEN Dias < 0 THEN 'PENDIENTE'
                        END
                        AS Estado
                        from    MtEstadoCartera 
                        where    NIT=@Nit  and TIPODCTO='KC' and Deuda > 0
                `,

  factureb2b: `
                        select  nombre,cantidad,producto,
                        CONVERT(numeric(10,0),  ((valorunit * ((100-descuento))/100)))  AS ValorUnitario,
			CONVERT(numeric(10,0),  ((valorunit * ((100-descuento))/100)* cantidad  ) *  (1+(IVA / 100 )))  AS Neto,
                        (
                                Select top 1 b.small_img
                                        from MtArticuloImagen b
                                where mvtrade.producto = b.IdArticulo and b.is_default = 1
                           ) Imagen                     
                           from    mvtrade
                        where   TIPODCTO=@Tipodcto and NRODCTO=@Nrodcto
                        

                `,

                ArticulosTotalb2b: `
                select  sum(cantidad) as TotalArticulos,
                
                sum(CONVERT(numeric(10,0),  (((valorunit * ((100-descuento))/100)* cantidad  ))*  (1+(IVA / 100 ))))  AS Neto
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
  select pedido.FECHAING,pedido.ESTADOPED, estado.Estado, pedido.direccion, pedido.Complemento,
   pedido.Nit, pedido.NRODCTO, pedido.TIPODCTO,  pedido.TIPODCTO + '-' + pedido.NRODCTO as Pedido,
   CONVERT(numeric(10,0),  pedido.NETO)  AS NETO, cliente.ListaPrecios,
	   (
		Select top 1 c.small_img
			from MvPedido b
				inner join MtArticuloImagen c on b.PRODUCTO = c.IdArticulo and c.is_default = 1
		where pedido.tipodcto = b.TIPODCTO and pedido.nrodcto = b.NRODCTO
	   ) Imagen
  from MtPedido pedido
  inner join MtEstadoPedido estado on estado.idestadopedido = pedido.ESTADOPED
  inner join MtCliente cliente on cliente.Nit  = pedido.NIT

                where pedido.TIPODCTO in ('PM', 'PB') AND pedido.NIT=@Nit
        `,

        pedido_detail: `
        select pedido.TIPODCTO + '-' + pedido.NRODCTO as Npedido,pedido.FECHAING,pedido.FECHAING as FECHAFAC,
        pedido.ESTADOPED, estado.Estado, pedido.direccion,pedido.Complemento, pedido.nit, '' as Descuento,
        CONVERT(numeric(10,0),  pedido.NETO)  AS NETO

       
        from MtPedido pedido
        inner join MtEstadoPedido estado on estado.idestadopedido = pedido.ESTADOPED
                      where pedido.NIT=@Nit and NRODCTO=@NRODCTO and TIPODCTO=@TIPODCTO `,

                      pedido_detail1: `
                      select  articulo.NombreAlterno, pedido.CANTIDAD, pedido.PRODUCTO,   ---, pedido.NETO,
                      CONVERT(numeric(10,0),  pedido.NETO)  AS PrecioUnitario,
                    CONVERT(numeric(10,0),  pedido.NETO * pedido.CANTIDAD)  AS Neto,
                  img.small_img  as Imagen                   
                  from MvPedido  pedido     
                                        inner join  MtArticulo articulo on articulo.IdArticulo = pedido.PRODUCTO
                                        inner join MtArticuloImagen img on pedido.PRODUCTO = img.IdArticulo and img.is_default = 1
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
                                where   NRODCTO=@NRODCTO and TIPODCTO=@TIPODCTO  and deuda > 0
         `,


         status: `
                update MtPedido
                        set ESTADOPED=@ESTADOPED,
                            IdTransaccion=@IdTransaccion,
                            EstadoTransaccion='Aprovado'
                        where  NRODCTO=@NRODCTO AND TIPODCTO=@TIPODCTO`,


        NRODCTO: `
                select Id,ConsecutPedAPKBq, ConsecutPedAPKNq 
                from MtConsecutivoTipoDcto
`,
mtprocli: `
                select * from MtCliente where nit =@NIT`,


        DatosEnvio: `select pedido.direccion,pedido.Complemento, pedido.ciudad, pedido.codciudad, pedido.NETO + pedido.TOTALIVA as Total, pedido.ESTADOPED,estado.Estado, TIPODCTO + '-' + NRODCTO AS ReferenciaPedido, '' as Descuento
        from MtPedido pedido
        inner join MtEstadoPedido estado on estado.IdEstadoPedido = pedido.ESTADOPED
        where pedido.idtransaccion=@idtransaccion
                `,
        DatosCliente: `select cliente.Nombre,cliente.Nit, cliente.Celular, cliente.Email
        from MtPedido pedido
        inner join MtCliente cliente on cliente.Nit = pedido.NIT
		where pedido.idtransaccion =@idtransaccion

`,

        TotalArticulos: `select PRODUCTO,Tipodcto,nrodcto from MvPedido  where TIPODCTO=@Tipodcto and nrodcto=@nrodcto`,


        DetalleTransacción: `
        select '' as MetodoPago, estadotransaccion ,'' as Motivo, idtransaccion as ReferenciaTransaccion from MtPedido 
                        where idtransaccion =@idtransaccion`,

        ArticulosTotal :`		
        select sum(MvPedido.CANTIDAD) as Articulos
        from MtPedido MtPedido
		inner join MvPedido MvPedido on MvPedido.NRODCTO = MtPedido.NRODCTO
		where MvPedido.NRODCTO = MtPedido.NRODCTO and MvPedido.TIPODCTO = MtPedido.TIPODCTO
			 and MtPedido.idtransaccion =@idtransaccion`,

        ArticulosTotal2: `select sum(CANTIDAD) as Articulos
        from MvPedido 
        where  NRODCTO=@NRODCTO AND TIPODCTO=@TIPODCTO`

};

