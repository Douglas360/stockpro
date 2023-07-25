export const MainNav = [
    {
        icon: 'pe-7s-home',
        label: 'Inicio',
        to: '/dashboards/basic',
    },
];
export const CadastroNav = [
    {
        icon: 'pe-7s-note2',
        label: 'Cadastro',
        content: [
            {
                label: 'Clientes',
                to: '/cadastro/cliente',
            },
            {
                label: 'Fornecedores',
                to: '/cadastro/fornecedor',
            },
            {
                label: 'Transportadoras',
                to: '/cadastro/transportadora',
            },
        ]
    }
];
export const ProdutoNav = [
    {
        icon: 'pe-7s-shopbag',
        label: 'Produto',
        content: [
            {
                label: 'Gerenciar Produtos',
                to: '/produto/gerenciar',
            },
            {
                label: 'Valores de Venda',
                to: '/produto/valores',
            },
        ]
    }
];
export const OrcamentoNav = [
    {
        icon: 'pe-7s-note',
        label: 'Orçamento',
        content: [
            {
                label: 'Produtos',
                to: '/orcamento/produto',
            },

        ]
    }
];
export const VendaNav = [
    {
        icon: 'pe-7s-cart',
        label: 'Venda',
        content: [
            {
                label: 'Produtos',
                to: '/venda/produto',
            },

        ]
    }
];
export const EstoqueNav = [
    {
        icon: 'pe-7s-box2',
        label: 'Estoque',
        content: [
            {
                label: 'Movimentações',
                to: '/estoque/movimentacao',
            },

        ]
    }
];
export const NotaFiscalNav = [
    {
        icon: 'pe-7s-drawer',
        label: 'Nota Fiscal',
        content: [
            {
                label: 'Gerenciar NF-e',
                to: '/nota-fiscal/gerenciar',
            },
        ]
    }
];
export const RelatorioNav = [
    {
        icon: 'pe-7s-display1',
        label: 'Relatório',
        content: [
            {
                label: 'Produtos',
                to: '/relatorio/produto',
            },
            {
                label: 'Vendas',
                to: '/relatorio/venda',
            },

        ]
    }
];
export const ConfiguracaoNav = [
    {
        icon: 'pe-7s-settings',
        label: 'Configuração',
        content: [
            {
                label: 'Gerais',
                to: '/configuracao/geral',
            },
            {
                label: 'Usuários',
                to: '/configuracao/usuario',
            },
            {
                label: 'Empresa',
                to: '/configuracao/empresa',
            },
            {
                label: 'Certificado Digital',
                to: '/configuracao/certificado-digital',
            }
        ]
    }
];
/*export const SairNav = [
    {
        icon: 'pe-7s-power',
        label: 'Sair',
        content: [
            {
                label: 'Sair',
                to: '/sair',
            },
        ]

    }
];*/






