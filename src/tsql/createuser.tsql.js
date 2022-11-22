export const tsqlcreateuser = {
	verify_existence: `
                        select Nit,Email from MtCliente
                        where Habilitado='s' and  Nit=@Nit and Email=@Email
                     `,
                      
	createuser: `
                  insert into MtCliente
                     (
                       [IdEmpresa], [Nit], [CodAlterno], [Nombre], [Pais], [CodCiudad], [Ciudad], [Direccion], 
                       [Telefono], [Celular], [Email], [Contacto], [ListaPrecios], [CodVendedor],[Habilitado], 
                       [Estado], [Cupo], [DctoPiePag], [CodTipoCl], [Latitud], [Longitud], [GeoPosCertificada], 
                       [Modificado], [CodVenModifica], [ObsCartera], [password]
                     )
                  values 
                     (
                        '1',
                        @Nit,
                        @Nit,
                        @Nombre,
                        'COLOMBIA',
                        @CodCiudad,
                        @Ciudad,
                        @Direccion,
                        @Telefono,
                        @Celular,
                        @Email,
                        '',
                        'WEB',
                        '0',
                        'S',
                        '',
                        '0',
                        '0',
                        '0',
                        '',
                        '',
                        '0',
                        '0',
                        'NULL',
                        '',
                        @encryptpassword
                     )
               `,
};
