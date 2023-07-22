export function getFormatterInputPrice(data) {
    return (
        isNaN(data)
            ? '' // Define uma string vazia se não for um número válido
            : parseFloat(data).toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
            })
    )
}
