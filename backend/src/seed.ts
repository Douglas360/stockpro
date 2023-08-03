import prismaClient from "./prisma";

async function main() {
    const situacaoVendas = [
        {
            descricao: 'Concretizada',
            cor: '#228B22',
            ativo: true,
        },
        {
            descricao: 'Em aberto',
            cor: '#DAA520',
            ativo: true,
        },
        {
            descricao: 'Em andamento',
            cor: '#00BFFF',
            ativo: true,
        },
        {
            descricao: 'Cancelada',
            cor: '#8B0000',
        }
    ];

    for (const situacaoVenda of situacaoVendas) {
        await prismaClient.situacaoVenda.create({ data: situacaoVenda });
    }

    const valorVenda = [
        {
            descricao: '50%',
            valor: 50,
        },
    ]

    for (const valor of valorVenda) {
        await prismaClient.lucroSugerido.create({ data: valor });
    }

    const formaPagamento = [
        {
            descricao: 'Dinheiro',
            ativo: true,
        },
        {
            descricao: 'Cartão de crédito',
            ativo: true,
        },
        {
            descricao: 'Cartão de débito',
            ativo: true,
        },
        {
            descricao: 'Pix',
            ativo: true,
        },
        {
            descricao: 'Transferência',
            ativo: true,
        },
        {
            descricao: 'Boleto',
            ativo: true,
        },
        {
            descricao: 'Cheque',
            ativo: true,
        },
    ]

    for (const forma of formaPagamento) {
        await prismaClient.formaPagamento.create({ data: forma });
    }


}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prismaClient.$disconnect();
    });
