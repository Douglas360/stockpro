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

}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prismaClient.$disconnect();
    });
