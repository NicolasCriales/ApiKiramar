export const tsqldatasheet = {
    datasheet:  `
                    select  Artcaract.IdArticulo, Caract.Descripcion, Artcaract.Valor
                    from MtArticuloCaracteristicas Artcaract
                    inner join MtCaracteristicas Caract on Caract.Codigo = Artcaract.CodigoCaracteristica
                    where Artcaract.IdArticulo=@IdArticulo AND NOT Caract.Codigo='14' order by CodigoCaracteristica 
                `
}