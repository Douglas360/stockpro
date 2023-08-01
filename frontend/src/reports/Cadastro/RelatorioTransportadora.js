import pdfMake from "pdfmake/build/pdfmake";
import { getHeader } from "../getHeader";
import { createFooter } from "../getFooter";

export const RelatorioTransportadora = (data) => {
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
                                text: 'Relatórios de Cadastros - Transportadoras',
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

            {
                table: {
                    headerRows: 1,
                    widths: ['auto', '*', '*', '*', '*', '*', '*'],
                    body: [
                        [
                            { text: 'ID', bold: true },
                            { text: 'Nome', bold: true },
                            { text: 'Tipo Transportadora', bold: true },
                            { text: 'CNPJ', bold: true },
                            { text: 'Razão Social', bold: true },
                            { text: 'Email', bold: true },
                            { text: 'Telefone', bold: true },
                        ],
                        ...(data || []).map((item) => [
                            { text: item.id_transportadora, fontSize: 10 }, // Adjust the font size if needed
                            { text: item.nome, fontSize: 10 }, // Adjust the font size if needed
                            { text: item.tipo_transportadora, fontSize: 10 }, // Adjust the font size if needed
                            { text: item.cnpj, fontSize: 10 }, // Adjust the font size if needed
                            { text: item.razao_social, fontSize: 10 }, // Adjust the font size if needed
                            { text: item.email, fontSize: 10 }, // Adjust the font size if needed
                            { text: item.telefone, fontSize: 10 }, // Adjust the font size if needed

                        ]),
                    ],
                },
            },
        ],
        footer: createFooter(),

    };

    pdfMake.createPdf(docDefinition).open();
};
