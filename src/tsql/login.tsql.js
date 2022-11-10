export const tsqllogin = {

    verify: ` select  MTCLI.Nit,MTCLI.ListaPrecios , MTCLI.Nombre, mtcli.CodCiudad, mtcli.Ciudad, MTDEP.coddpto, MTDEP.departamento,
                      mtcli.Direccion, mtcli.Celular, mtcli.Email,  mtcli.password, '' as Complemento
    from KellerDeskTop_Pruebas.dbo.MtCliente MTCLI
        inner join KellerDeskTop_Pruebas.dbo.MtDepartamento MTDEP  on  left (MTCLI.CodCiudad,2)  = MTDEP.coddpto 
        where MTCLI.Habilitado='s' and  MTCLI.Nit=@Nit   
    `,


    verifydata: `       
                    select  MTCLI.Nit, MTCLI.Nombre, mtcli.CodCiudad, mtcli.Ciudad, MTDEP.coddpto, MTDEP.departamento, mtcli.Direccion, mtcli.Celular, mtcli.Email,  mtcli.password
                    from KellerDeskTop_Pruebas.dbo.MtCliente MTCLI
                        inner join KellerDeskTop_Pruebas.dbo.MtDepartamento MTDEP  on  left (MTCLI.CodCiudad,2)  = MTDEP.coddpto    
                    where MTCLI.Habilitado='s' and  MTCLI.Nit=@Nit and MTCLI.password=@password
                `,   
                changePassword: ` update MtCliente
                    set password=@encryptpassword
                        where  Nit=@Nit  `,
                        updatecodigo: ` update MtCliente
                            set codpassword=@codpassword
                            where  Nit=@Nit`,

                            recoverpassword:`select codpassword from MtCliente where Nit=@Nit`,
                            newpasword: `
                            update MtCliente 
                                set password=@encryptpassword
                                where  Nit=@Nit
                                `
}
