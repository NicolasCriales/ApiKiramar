export const tsqllogin = {
    verifydata: `
                    select  RTRIM (Nit) as Nit,RTRIM(Nombre) as Nombre,RTRIM(Ciudad) as Ciudad,RTRIM(CodCiudad) as CodCiudad,'' as departamento, 
                            RTRIM(Direccion) as Direccion,RTRIM(Email) as Email,RTRIM(Telefono) as Telefono
                    from MtCliente where Nit=@nit
                    
                `
}
