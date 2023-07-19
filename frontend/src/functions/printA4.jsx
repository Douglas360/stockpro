import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

export const printA4 = (data) => {
    console.log(data)
    const imgUrl = 'data:image/png;base64,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"'
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const docDefinition = {
        pageSize: 'A4',
        content: [
            //Cabecalho da venda com as informaçoes da empresa
            {
                table: {
                    widths: ['auto', '*'], // Adjust the column widths as needed
                    body: [
                        [
                            {
                                image: imgUrl,
                                fit: [100, 100],
                                alignment: 'left',
                                border: [true, true, false, true], // Add borders to all sides
                                borderColor: 'red', // Set the border color to red
                            },
                            {
                                text: [
                                    { text: 'Empresa: ', bold: true },
                                    { text: data.empresa?.nome || 'N/A' },
                                    '\n',
                                    { text: 'CNPJ: ', bold: true },
                                    { text: data.empresa?.cnpj || 'N/A' },
                                    '\n',
                                    { text: 'Endereço: ', bold: true },
                                    { text: data.empresa?.endereco || 'N/A' },
                                    '\n',
                                    { text: 'Telefone: ', bold: true },
                                    { text: data.empresa?.telefone || 'N/A' },
                                    '\n',
                                    { text: 'Email: ', bold: true },
                                    { text: data.empresa?.email || 'N/A' },
                                    '\n',
                                ],
                                alignment: 'right',
                                border: [false, true, true, true], // Add borders to all sides
                                borderColor: 'red', // Set the border color to red
                            },
                        ],
                    ],
                },
                /*  layout: {
                      fillColor: (i, node) => (i === 0 ?  '#e2dddd' : null),
                  },*/
            },

            //Numero da venda e data
            {
                table: {
                    widths: ['*', 'auto'], // Adjust the column widths as needed
                    body: [
                        [
                            {
                                text: [
                                    { text: 'VENDA: ', style: 'subheader' },
                                    { text: data.numero_venda || 'N/A' },
                                ],
                                alignment: 'center',
                                border: [true, true, false, true], // Add borders to all sides

                            },
                            {
                                text: [
                                    { text: 'Data: ' },
                                    { text: new Date(data.data_venda).toLocaleDateString() || 'N/A' },
                                ],
                                alignment: 'left',
                                border: [false, true, true, true], // Add borders to all sides

                            },
                        ],
                    ],
                },
                margin: [0, 10, 0, 0],
                layout: {
                    fillColor: (i, node) => (i === 0 ? '#e2dddd' : null),


                },
            },

            //Dados do cliente
            {
                table: {
                    widths: ['auto', '*', 'auto', '*'],
                    body: [
                        [
                            {
                                text: 'DADOS DO CLIENTE', style: 'title',                                
                                alignment: 'left',
                                fillColor: '#e2dddd',
                                colSpan: 4,
                            },
                            {},
                            {},
                            {},
                        ],

                        [
                            { text: 'Razão social:', style: 'title' },
                            { text: data.cliente?.razao_social || 'N/A', style: 'text' },
                            { text: 'Nome fantasia:', style: 'title' },
                            { text: data.cliente?.nome || 'N/A', style: 'text' },

                        ],
                        [
                            { text: 'CNPJ/CPF:', style: 'title' },
                            { text: data.cliente?.cnpj || data.cliente?.cpf || 'N/A', style: 'text' },
                            { text: 'Endereço:', style: 'title' },
                            { text: `${data?.cliente?.enderecos[0].rua}, ${data?.cliente?.enderecos[0].numero} - ${data.cliente.enderecos[0].bairro} ` || 'N/A', style: 'text' },
                        ],
                        [
                            { text: 'CEP:', style: 'title' },
                            { text: data.cliente?.enderecos[0].cep || 'N/A', style: 'text' },
                            { text: 'Cidade/UF:', style: 'title' },
                            { text: `${data.cliente?.enderecos[0].cidade} - ${data.cliente?.enderecos[0].estado}` || 'N/A', style: 'text' },
                        ],
                        [
                            { text: 'Telefone:', style: 'title' },
                            { text: data.cliente?.telefone || 'N/A', style: 'text' },
                            { text: 'Email:', style: 'title' },
                            { text: data?.cliente?.email, style: 'text' },

                        ],

                    ],
                },
                margin: [0, 10, 0, 0],
            },


            // Itens da venda           
            {
                table: {
                    headerRows: 2,
                    widths: ['auto', '*', '*', '*', '*', '*'],
                    body: [
                        [
                            {
                                text: 'PRODUTOS', style: 'title',
                                colSpan: 6,
                                alignment: 'left',
                                fillColor: '#e2dddd',
                            },
                            {},
                            {},
                            {},
                            {},
                            {},

                        ],
                        // Cabeçalho da tabela
                        [
                            { text: 'Item', bold: true }, // Deixa o cabeçalho em negrito
                            { text: 'Produto', bold: true }, // Deixa o cabeçalho em negrito
                            { text: 'Unidade', bold: true }, // Deixa o cabeçalho em negrito
                            { text: 'Quantidade', bold: true }, // Deixa o cabeçalho em negrito
                            { text: 'Valor Unitário', bold: true }, // Deixa o cabeçalho em negrito
                            { text: 'Valor Total', bold: true }, // Deixa o cabeçalho em negrito
                        ],
                        // Linhas dos itens
                        ...(data.itens || []).map((item) => [
                            { text: item.numero_item, style: 'text' }, // Aplica o estilo 'item'
                            { text: item.produto?.nome || 'N/A', style: 'text' }, // Aplica o estilo 'item'
                            { text: 'UN', style: 'text' }, // Aplica o estilo 'item'
                            { text: item.quantidade || 'N/A', style: 'text' }, // Aplica o estilo 'item'
                            { text: `R$ ${item.valor_unitario.toFixed(2)}` || 'N/A', style: 'text' }, // Aplica o estilo 'item'
                            { text: `R$ ${item.valor_total.toFixed(2)}` || 'N/A', style: 'text' }, // Aplica o estilo 'item'
                        ]),

                        // Linha do Frete, se houver
                        ...(data.valor_frete > 0 ? [
                            [
                                { text: 'Frete', colSpan: 5, alignment: 'right', bold: true },
                                {},
                                {},
                                {},
                                {},
                                { text: `R$ ${data.valor_frete.toFixed(2)}`, fontSize:'12', bold: true },
                            ],
                        ] : []),

                        // Linha do total
                        [
                            { text: 'Total', colSpan: 5, alignment: 'right', bold: true },
                            {},
                            {},
                            {},
                            {},
                            { text: `R$ ${data.valor_total.toFixed(2)}`, fontSize:'14', bold: true },
                        ],


                    ],
                },
                margin: [0, 10, 0, 0],
                layout: {
                    fillColor: (i, node) => (i === 0 ? '#e2dddd' : null),
                },
            },



            // Assinatura do cliente
            {
                table: {
                    widths: ['*'],
                    body: [
                        [
                            {
                                text: '_______________________________________________',
                                alignment: 'center',
                                margin: [0, 20, 0, 0],
                                border: [true, true, true, false], // Add borders to all sides

                            },


                        ],
                        [
                            {
                                text: 'Assinatura do cliente',
                                alignment: 'center',
                                border: [true, false, true, true], // Add borders to all sides
                            },

                        ],

                    ],
                },
                margin: [0, 20, 0, 0],
            },

        ],
        styles: {
            header: {
                fontSize: 16,
                bold: true,
                margin: [0, 10, 0, 10],
            },
            subheader: {
                fontSize: 14,
                bold: true,
                margin: [0, 5, 0, 5],
            },
            title: {
                fontSize: 10,
                bold: true,

            },
            text: {
                fontSize: 8,
            },
        },
    };

    pdfMake.createPdf(docDefinition).open();
};
