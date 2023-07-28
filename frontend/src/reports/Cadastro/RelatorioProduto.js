import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { getHeader } from "../getHeader";
import { createFooter } from "../getFooter";

export const RelatorioProduto = (data) => {
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
                                text: 'Relatórios de Cadastros - Produtos',
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
                            { text: 'Cod.', style: 'header' },
                            { text: 'Nome', style: 'header' },
                            { text: 'NCM', style: 'header' },
                            { text: 'Valor de custo', style: 'header' },
                            { text: 'Valor de venda', style: 'header' },
                            { text: 'Estoque', style: 'header' },
                            { text: 'Fornecedor', style: 'header' },
                        ],
                        ...(data || []).map((item) => [
                            { text: item?.codigo_interno, style: 'row' }, // Adjust the font size if needed
                            { text: item?.nome, style: 'row' }, // Adjust the font size if needed
                            { text: item?.codigo_ncm, style: 'row' }, // Adjust the font size if needed
                            { text: formatCurrency(item?.custo_final), style: 'row', alignment: 'right' }, // Format as 
                            { text: formatCurrency(item?.valor_venda), style: 'row', alignment: 'right' }, // Format as 
                            { text: item?.estoque[0]?.quantidade, style: 'row' }, // Adjust the font size if needed
                            { text: item?.fornecedor?.nome, style: 'row' }, // Adjust the font size if needed

                        ]),
                    ],
                },
            },
        ],
        footer: createFooter(),
        styles: {
            header: {
                fontSize: 11,
                bold: true,
                alignment: 'center',
            },
            row: {
                fontSize: 10,
                alignment: 'center',
            },
        }

    };

    pdfMake.createPdf(docDefinition).open();
};

// Function to format numbers as currency strings
function formatCurrency(value) {
    return Number(value).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
}