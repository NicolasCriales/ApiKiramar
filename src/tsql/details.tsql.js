export const tsqldetails = {
	datasheet: `
                    select  Artcaract.IdArticulo, Caract.Descripcion, Artcaract.Valor
                    from MtArticuloCaracteristicas Artcaract
                    inner join MtCaracteristicas Caract on Caract.Codigo = Artcaract.CodigoCaracteristica
                    where Artcaract.IdArticulo=@IdArticulo AND NOT Caract.Codigo='14' order by CodigoCaracteristica 
                `,

	typePQRS: `
                    select Codigo,Nombre 
                    from MtTipoPQRS 
              `,

	registerPQRS: `
                    insert into mvMotivoPqrs
	                    (
	                    	[fechaing], [motivo], [idTipoPqrs], [idEstadoPqrs], [fechaEstadoPqrs], [nit], [respuesta]
	                    )
	                values 
	                    (
                           @FechaKiramar, @motivo, @tipoPqrs, 1, @FechaKiramar, @Nit, '' 
	                    )
                  `,

	responsePQRS: `
                    insert into mvRespuestaPqrs
                        (
                            [id], [fechaing], [nit], [respuesta], [responsable]
                        )
                    values
                        (
                            @id,@FechaKiramar, @Nit,@respuesta, @responsable
                        )
                  `,

	PQRS: `
            select	mvPqrs.nit,mvPqrs.id, mvPqrs.fechaing, mvPqrs.motivo, mvPqrs.idtipopqrs, tipo.Nombre as tipopqrs  ,
                    mvPqrs.idestadopqrs,  estado.Nombre as estadopqrs 
            from    mvMotivoPqrs mvPqrs
                    inner join MtTipoPQRS tipo on tipo.Codigo = mvPqrs.idtipopqrs
                    inner join MtEstadoPQRS estado on estado.Codigo = mvPqrs.idestadopqrs
            where   mvPqrs.nit=@Nit
          `,

	idPQRS: `
                select	mvPqrs.id, mvPqrs.fechaing, mvPqrs.motivo, mvPqrs.idtipopqrs, tipo.Nombre as tipopqrs, 
                        mvPqrs.idestadopqrs,  estado.Nombre as estadopqrs, mvPqrs.fechaestadopqrs, mvPqrs.nit,
                        mvPqrs.respuesta
                from mvMotivoPqrs mvPqrs
                    inner join MtTipoPQRS tipo on tipo.Codigo = mvPqrs.idtipopqrs
                    inner join MtEstadoPQRS estado on estado.Codigo = mvPqrs.idestadopqrs
	            where mvPqrs.nit=@Nit and mvPqrs.id=@id

            `,

	idresponse: `
                    select id,fechaing,nit,respuesta,responsable 
                    from [mvRespuestaPqrs]
                    where id =@id and nit=@Nit
                `,

	existreview:`
                    select nit,idproducto,calificacion, opinion, nombre  
                    from mvResena 
                    where nit=@Nit and idproducto=@idproducto
                `,

	registerReview: `
                        insert into mvResena
                            (
                                [Nit], [idproducto], [calificacion], [opinion], [nombre]
                            )
                        values 
                            (
                              @Nit, @idproducto, @calificacion, @opinion, @NombreCli
                            )                
                    `,

	review: `
                select idproducto,calificacion,opinion,nombre 
                from mvResena 
                where idproducto=@idproducto
            `,
};
