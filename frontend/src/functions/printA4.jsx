import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { imgUrl } from "../reports/imgUrl";

export const printA4 = (data) => {
   

    function createFooter() {
        return {
            table: {
                widths: ['*'],
                body: [
                    [{ 
                        text: 'Orçamento emitido no StockPro - www.stockpro.com.br', 
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
                                    { text: `${data.title}: `, style: 'subheader' },
                                    { text: data.numero_venda || data.numero_orcamento || 'N/A' },
                                ],
                                alignment: 'center',
                                border: [true, true, false, true], // Add borders to all sides

                            },
                            {
                                text: [
                                    { text: 'Data: ' },
                                    {
                                        text: new Date(data.data_venda).toLocaleDateString() ||
                                            new Date(data.data_orcamento).toLocaleDateString() || 'N/A'
                                    },
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

            //Se for orçamento, mostra introdução
            ...(data.introducao ? [
                {
                    text: [

                        { text: data.introducao || 'N/A' },
                    ],
                    margin: [0, 10, 0, 0],
                },
            ] : []),

            //Se for orçamento, mostra validade do orçamento igual ao campo title
            ...(data.validade_orcamento ? [
                {
                    table: {
                        widths: ['*'], // Adjust the column widths as needed
                        body: [
                            [
                                {
                                    text: [
                                        { text: 'VALIDADE DA PROPOSTA: ', style: 'title' },
                                        { text: data.validade_orcamento },
                                    ],

                                    border: [true, true, true, true], // Add borders to all sides

                                },

                            ],
                        ],
                    },
                    margin: [0, 10, 0, 0],
                    layout: {
                        fillColor: (i, node) => (i === 0 ? '#e2dddd' : null),


                    },
                },
            ] : []),


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
                                { text: `R$ ${data.valor_frete.toFixed(2)}`, fontSize: '12', bold: true },
                            ],
                        ] : []),

                        // Linha do total
                        [
                            { text: 'Total', colSpan: 5, alignment: 'right', bold: true },
                            {},
                            {},
                            {},
                            {},
                            { text: `R$ ${data.valor_total.toFixed(2)}`, fontSize: '14', bold: true },
                        ],


                    ],
                },
                margin: [0, 10, 0, 0],
                layout: {
                    fillColor: (i, node) => (i === 0 ? '#e2dddd' : null),
                },
            },

            //Se for orçamento, mostra observação
            ...(data.observacao ? [
                {
                    table: {
                        widths: ['*'], // Adjust the column widths as needed
                        body: [
                            [
                                {
                                    text: [
                                        { text: 'OBSERVAÇÕES: ', style: 'title' },

                                    ],

                                    border: [true, true, true, true], // Add borders to all sides

                                }

                            ],
                            [
                                {
                                    text: [
                                        { text: data.observacao },
                                    ],
                                }
                            ]
                        ],
                    },
                    margin: [0, 10, 0, 0],
                    layout: {
                        fillColor: (i, node) => (i === 0 ? '#e2dddd' : null),


                    },
                },
            ] : []),

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
        //Footer da venda
        footer: createFooter(),
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
