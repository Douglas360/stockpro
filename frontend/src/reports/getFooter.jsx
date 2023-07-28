export function createFooter() {
    return {
        table: {
            widths: ['*'],
            body: [
                [{
                    text: `Relatório gerado por StockPro www.stockpro.com.br em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`,
                    alignment: 'right',
                    fontSize: 8,
                    italics: true,
                    margin: [0, 0, 10, 0],
                }],
            ],

        },
        layout: {
            defaultBorder: false,
            fillColor: '#ffffff', // Set the background color of the footer
        },
    };
}