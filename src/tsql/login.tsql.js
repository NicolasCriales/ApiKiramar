export const tsqllogin = {
    verifydata: `
                    select  RTRIM (Nit) as Nit,RTRIM(Nombre) as Nombre,RTRIM(CodCiudad) as CodCiudad,RTRIM(Ciudad) as Ciudad,'' as departamento, 
                            RTRIM(Direccion) as Direccion,RTRIM(Telefono) as Telefono,RTRIM(Email) as Email,RTRIM(ListaPrecios) as ListaPrecios,RTRIM(Habilitado) as Habilitado
                    from MtCliente 
                    where Habilitado='s' and  Nit='091428061-9' and Email='DBRITOVELASQUEZ@GMAIL.COM'
                `,   
}
