export const tsqlspecialized_store = {
    specialized_store: `
    select RTRIM(CODSUMIN) as CODSUMIN ,RTRIM(NOMBRE) as NOMBRE,
    'https://dkasa.com.co/media/Imageneskiramar/tiendasoficiales/' + RTRIM(CODSUMIN) + '.jpg' as IMAGEN, orden
    from MtSumini 
    where swActivo='1' and swTiendaOficial='1' and swAppKiramar='1' and  Orden > 0
    order by orden asc
    `
}