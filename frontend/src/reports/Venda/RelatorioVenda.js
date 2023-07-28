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
                                text: 'Relatórios de Orçamentos',
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
                text: `Período: ${data?.data_inicial} - ${data?.data_final}`,
                fontSize: 10,
                bold: true,
                margin: [0, 0, 0, 10],
            },


            {
                table: {
                    headerRows: 1,
                    widths: ['auto', '*', '*', '*', '*'],
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
                            { text: item.data_orcamento, fontSize: 10 }, // Adjust the font size if needed
                            { text: item.situacao, fontSize: 10 }, // Adjust the font size if needed
                            //field formatted as currency brl 
                            { text: item.valor_total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }), fontSize: 10 }, // Adjust the font size if needed         

                        ]),
                    ],
                },
            },
        ],
        footer: createFooter(),

    };

    pdfMake.createPdf(docDefinition).open();
};
