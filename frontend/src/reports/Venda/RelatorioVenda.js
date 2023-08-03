import pdfMake from "pdfmake/build/pdfmake";
import { createFooter } from "../getFooter";
import { getHeader } from "../getHeader";

export const RelatorioVenda = (data) => {

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
                                text: `Relatórios de ${data?.tipo_relatorio}`,
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
                    widths: ['auto', '*', '*', '*', '*',],
                    body: [
                        [
                            { text: 'Cód', bold: true },
                            { text: 'Cliente', bold: true },
                            { text: 'Data', bold: true },
                            { text: 'Situação', bold: true },
                            { text: 'Valor total', bold: true },
                        ],
                        ...(data || []).map((item) => [
                            { text: item.numero_orcamento, fontSize: 10 }, // Adjust the font size if needed
                            { text: item.cliente, fontSize: 10 }, // Adjust the font size if needed
                            { text: item.data_orcamento || item.data_venda, fontSize: 10 }, // Adjust the font size if needed
                            { text: item.situacao, fontSize: 10 }, // Adjust the font size if needed
                            //field formatted as currency brl 
                            { text: item.valor_total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }), fontSize: 10 }, // Adjust the font size if needed         

                        ]),
                        [
                            {  }, // Empty cell spanning four columns
                            {  },
                            {  },
                            { text: 'Total', bold: true, fontSize: 14, alignment: 'right' },
                            // TotalValue cell, if totalValue is zero, show an empty string.
                            { text: data?.valor_total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }), fontSize: 14, bold: true,},
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
