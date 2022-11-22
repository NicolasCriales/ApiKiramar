export const tsqlbanners = {
  idbanners:   `    
                  select id, descripcion from MTBannerZonas
               `,

	banners: ` 
               select imagen,ruta,orden,swInactivo,swDkasa,swKiramar,codproveedor, idzonas,is_video, Titulo
               from MtBanners 
               where swInactivo='0' AND swKiramar='1' AND swDkasa='0' AND orden >= 1 AND idzonas=@id
            `,
};
