export const tsqlorder = {
	infoproduct:`

					Select  b.IdProducto, b.Precio as Valorunit,b.IVA,b.DctoBase, b.DctoPromocional,
						CONVERT(numeric(10,0),( ((b.Precio * ((100-B.DctoBase))/100) * ((100-B.DctoPromocional))/100))) AS CONDCTOPROMO,
						b.DctoCcial as DTOCCIAL,
						CONVERT(numeric(10,0), ((b.Precio * ((100-B.DctoBase))/100) * ((100-B.DctoPromocional)/100)) * ((100-B.DctoCcial)/100) )  AS CONDCTOCOMERCIAL,
						CONVERT(numeric(10,0), (((b.Precio * ((100-B.DctoBase))/100) * ((100-B.DctoPromocional)/100)) * ((100-B.DctoCcial)/100)) * (b.IVA / 100 ) )  AS CONIVA,
						CONVERT(numeric(10,0), (((b.Precio * ((100-B.DctoBase))/100) * ((100-B.DctoPromocional)/100)) * ((100-B.DctoCcial)/100)) * (1+(b.IVA / 100 ))) AS NETO
					from MtListaPrecioArticulo as b
					where b.IdListaPrecios =@ListaPrecios and B.IdProducto=@PRODUCTO
    			`,

	orderb2b: `    
	            select  CodVendedor,Nit,TipoDcto,NroDcto,FechaDcto,FechaVencimiento,Dias,Deuda , 
			            CASE 
				            WHEN Dias > 0 THEN 'MORA'
				            WHEN Dias < 0 THEN 'PENDIENTE'
			            END AS Estado
	            from    MtEstadoCartera 
	            where    NIT=@Nit  and TIPODCTO='KC' and Deuda > 0
	    `,

	factureb2b: `
	            select  nombre,cantidad,LTRIM(RTRIM(producto)) as producto,
		                CONVERT(numeric(10,0),  ((valorunit * ((100-descuento))/100) * (1+(IVA / 100 ))))  AS ValorUnitario,
		                CONVERT(numeric(10,0),  ((valorunit * ((100-descuento))/100) * (1+(IVA / 100 )) * cantidad))  AS Neto,
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
	                            sum(CONVERT(numeric(10,0),  (((valorunit * ((100-descuento))/100)* cantidad  )) *  
                                   (1+(IVA / 100 ))))  AS Neto
	                    from    mvtrade
	                    where   TIPODCTO=@Tipodcto and NRODCTO=@Nrodcto
    `,

	pedido: `
                select  pedido.FECHAING,pedido.ESTADOPED, estado.Estado, pedido.direccion, pedido.Complemento,
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
                where pedido.TIPODCTO in ('HN', 'HB', 'HC') AND pedido.NIT=@Nit
            `,

	pedido_detail: `
                    select pedido.TIPODCTO + '-' + pedido.NRODCTO as NPedido,pedido.Fechaing,pedido.FECHAING as FechaFac,
                           pedido.EstadoPed, estado.Estado, pedido.Direccion,pedido.Complemento, pedido.Nit, '' as Descuento
                    from MtPedido pedido
                         inner join MtEstadoPedido estado on estado.idestadopedido = pedido.ESTADOPED
	                where pedido.NIT=@Nit and NRODCTO=@NRODCTO and TIPODCTO=@TIPODCTO 
                  `,

	pedido_detail1: `
		              select  articulo.NombreAlterno as nombre, pedido.cantidad, pedido.producto,
		                      CONVERT(numeric(10,0),  pedido.NETO / pedido.cantidad)  AS ValorUnitario,
		                      CONVERT(numeric(10,0),  pedido.NETO )  AS Neto, img.small_img  as Imagen                   
	                  from MvPedido  pedido     
		            		inner join  MtArticulo articulo on articulo.IdArticulo = pedido.PRODUCTO
		            		inner join MtArticuloImagen img on pedido.PRODUCTO = img.IdArticulo and img.is_default = 1
		              where pedido.NRODCTO=@NRODCTO and pedido.TIPODCTO=@TIPODCTO    

    `,

	facture_detailfech: `
			                select  FechaDcto,FechaVencimiento,Dias ,  deuda,Nit,
				                CASE 
				            	    WHEN Dias > 0 THEN 'MORA'
				            	      WHEN Dias < 0 THEN 'PENDIENTE'
				                END AS Estado
			                from    MtEstadoCartera 
			                where   NRODCTO=@NRODCTO and TIPODCTO=@TIPODCTO  and deuda > 0
     `,

	status: `
	            update MtPedido
		            set	IdTransaccion=@IdTransaccion,
		        		EstadoTransaccion='Pendiente'
		        where  NRODCTO=@NRODCTO AND TIPODCTO=@TIPODCTO`,

	NRODCTO: `
	            select Id,ConsecutPedAPKBq, ConsecutPedAPKNq, ConsecutPedAPKCa
	            from MtConsecutivoTipoDcto
            `,

	mtprocli:  `
	                select * from MtCliente where nit =@NIT
                `,

	DatosEnvio: `
                    select pedido.direccion,pedido.Complemento, pedido.ciudad, pedido.codciudad, 
                           pedido.NETO + pedido.TOTALIVA as Total, pedido.ESTADOPED,estado.Estado,
                           TIPODCTO + '-' + NRODCTO AS ReferenciaPedido, '' as Descuento
                    from MtPedido pedido
                         inner join MtEstadoPedido estado on estado.IdEstadoPedido = pedido.ESTADOPED
                    where pedido.idtransaccion=@idtransaccion
	            `,

	DatosCliente: `
                    select cliente.Nombre,cliente.Nit, cliente.Celular, cliente.Email
                    from MtPedido pedido
                         inner join MtCliente cliente on cliente.Nit = pedido.NIT
	                where pedido.idtransaccion =@idtransaccion
                `,

	TotalArticulos: `
                        select PRODUCTO,Tipodcto,nrodcto from MvPedido  where TIPODCTO=@Tipodcto and nrodcto=@nrodcto
                    `,

	DetalleTransacción: `
                            select  nota as MetodoPago, LTRIM(RTRIM(estadotransaccion)) as  estadotransaccion, nota as Motivo,
                                    idtransaccion as ReferenciaTransaccion from MtPedido 
		                    where idtransaccion =@idtransaccion
                        `,

	ArticulosTotal: `		
                        select sum(MvPedido.CANTIDAD) as Articulos
                        from MtPedido MtPedido
	                        inner join MvPedido MvPedido on MvPedido.NRODCTO = MtPedido.NRODCTO
	                    where MvPedido.NRODCTO = MtPedido.NRODCTO and MvPedido.TIPODCTO = MtPedido.TIPODCTO and 
                              MtPedido.idtransaccion =@idtransaccion
                    `,

	ArticulosTotal2: `
                        select sum(CANTIDAD) as TotalArticulos,sum(CONVERT(numeric(10,0),  NETO))  AS Neto
                        from MvPedido 
                        where  NRODCTO=@NRODCTO AND TIPODCTO=@TIPODCTO
                    `,

	factureStatus: `
                        insert into MtPagoCartera
                            (
                                [TIPODCTO], [NRODCTO], [NIT], [FECHA], [VALOR], [ESTADO], [IDTRANSACCION], [METODOPAGO],
                                [ESTADOTRANSACCION], [MOTIVO]
                            )
                        values
                            (
                                @TIPODCTO, @NRODCTO, @NitUsername, @FechaKiramar,@Total, @ESTADOPED, @IdTransaccion, 
                                '' , 'Pendiente' , ''
                            )
                    `,

	DatosEnviofac: `
                        select cliente.direccion, '' as Complemento, cliente.ciudad, cliente.codciudad, 
                               pagocartera.valor as Total, estado.Estado as ESTADOPED,pagocartera.Estado,
	                    	   pagocartera.tipodcto + '-' + pagocartera.nrodcto as ReferenciaPedido, '' as Descuento 
                        from MtpagoCartera pagocartera
	                        inner join MtCliente cliente on cliente.Nit = pagocartera.nit
                            inner join MtEstadoPedido estado on estado.IdEstadoPedido = pagocartera.estado
                        where idtransaccion=@idtransaccion
    `               ,

	DatosClientefac: `
                        select cliente.Nombre, cliente.Nit, cliente.Celular, cliente.Email
                        from MtpagoCartera pagocartera
                            inner join MtCliente cliente on cliente.Nit = pagocartera.nit
                        where pagocartera.idtransaccion =@idtransaccion 
                    `,

	TotalArticulosfac: `
                            select sum(mvtrade.cantidad) as Articulos
                            from MtpagoCartera pagocartera
                                inner join mvtrade mvtrade on mvtrade.nrodcto = pagocartera.nrodcto
                            where pagocartera.idtransaccion=@idtransaccion
                        `,

	DetalleTransacciónfac: `
                                select MetodoPago,  LTRIM(RTRIM(estadotransaccion)) as  estadotransaccion, Motivo,
                                    idtransaccion AS ReferenciaTransaccion
                                from MtpagoCartera 
                                where idtransaccion = @idtransaccion
                            `,

    datafacture: `
                    select PEDIDO.TIPODCTO, PEDIDO.NRODCTO, PEDIDO.FECHA, PEDIDO.Nit,cliente.Email, PEDIDO.BRUTO, PEDIDO.DESCUENTO,
                           PEDIDO.TOTALIVA, PEDIDO.NETO, PEDIDO.Direccion, pedido.Ciudad ,PEDIDO.IdTransaccion, 
                           cliente.Nombre, Pais
                    from MtPedido PEDIDO 
                        inner join MtCliente cliente on cliente.Nit= PEDIDO.NIT 
                    where PEDIDO.NRODCTO=@NRODCTO and PEDIDO.TIPODCTO=@TIPODCTO and PEDIDO.IdTransaccion=@IdTransaccion
                `,

	datoscli: `select Email,Nombre from MtCliente where Nit=@NitUsername`
};
