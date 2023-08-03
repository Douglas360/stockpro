import pdfMake from "pdfmake/build/pdfmake";
import { createFooter } from "../getFooter";
import { getHeader } from "../getHeader";

export const RelatorioProdutoMaisVendido = (data) => {
    const docDefinition = {
        pageSize: 'A4',
        pageMargins: [20, 10, 20, 20],
        pageOrientation: 'landscape',
        content: [
            //Cabecalho da venda com as informaçoes da empresa
            getHeader(data),

            {
                table: {
                    widths: ['*', 'auto'],
                    body: [
                        [
                            {
                                text: 'Relatórios de produtos mais vendidos',
                                fontSize: 16,
                                bold: true,

                            },
                            {
                                text: new Date().toLocaleDateString(), // You can use the current date or customize it as needed
                                alignment: 'right',
                            },
                        ],

                    ],
                },
                margin: [0, 10, 0, 10],
            },
            //Adicionar o filtro de data
            {
                text: `Período: ${data?.data_inicial || ''} - ${data?.data_final || ''}`,
                fontSize: 10,
                bold: true,
                margin: [0, 0, 0, 10],
            },


            {
                table: {
                    headerRows: 1,
                    widths: ['auto', '*', 'auto', '*'],
                    body: [
                        [
                            { text: 'Cód', bold: true },
                            { text: 'Nome', bold: true },
                            { text: 'Quantidade', bold: true },
                            { text: 'Valor total', bold: true },
                        ],
                        ...(data || []).map((item) => [
                            { text: item.codigo_interno, fontSize: 10 }, // Adjust the font size if needed
                            { text: item.nome_produto, fontSize: 10 }, // Adjust the font size if needed
                            { text: item.quantidade, fontSize: 10, alignment: 'center',  }, // Adjust the font size if needed                            
                            { text: item.valor_total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }), fontSize: 10 }, // Adjust the font size if needed         

                        ]),
                        [
                            {},
                            { text: 'Total', bold: true, fontSize: 12, alignment: 'right' },
                            // TotalValue cell, if totalValue is zero, show an empty string.
                            { text: data?.quantidade_total, fontSize: 12, bold: true, alignment: 'center', },
                            { text: data?.valor_total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }), fontSize: 12, bold: true, },
                        ]
                    ],
                },
            },
        ],
        footer: createFooter(),

    };

    //pdfMake.createPdf(docDefinition).open();
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);

     // Open the PDF in a new tab and set the title
     pdfDocGenerator.getBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const tab = window.open();
        tab.document.write(`<iframe src="${url}" frameborder="0" style="width: 100%; height: 100vh;"></iframe>`);
        tab.document.title = "Relatorio de Venda";    
        tab.document.close();
    });
};
