import { imgUrl } from "./imgUrl";

export function getHeader(company) {
    return (
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
                                { text: company[0]?.nomeEmpresa || 'N/A' },
                                '\n',
                                { text: 'CNPJ: ', bold: true },
                                { text: company[0]?.cnpjEmpresa || 'N/A' },
                                '\n',
                                { text: 'Endereço: ', bold: true },
                                { text: company[0]?.enderecoEmpresa || 'N/A' },
                                '\n',
                                { text: 'Telefone: ', bold: true },
                                { text: company[0]?.telefoneEmpresa || 'N/A' },
                                '\n',
                                { text: 'Email: ', bold: true },
                                { text: company[0]?.emailEmpresa || 'N/A' },
                                '\n',
                            ],
                            alignment: 'right',
                            border: [false, true, true, true], // Add borders to all sides
                            borderColor: 'red', // Set the border color to red
                        },
                    ],
                ],
            }
        }
    )
}

