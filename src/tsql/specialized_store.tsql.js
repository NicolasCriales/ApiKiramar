export const tsqlspecialized_store = {
    specialized_store: `
                        select RTRIM(CODSUMIN) as CODSUMIN ,RTRIM(NOMBRE) as NOMBRE 
                        from MtSumini 
                        where swActivo='1' and swTiendaOficial='1' and swAppKiramar='1' and not swAppDkasa='1' and not CODSUMIN in ('1155','1440')
    `
}