import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { UncontrolledTooltip } from 'reactstrap';

// Import only the necessary components and functions from your custom modules
import PageTitle from '../../../Layout/AppMain/PageTitle';
import { SearchBar } from '../../../components/SearchBar';
import { CustomSpinner } from '../../../components/CustomSpinner';
import { useInvoice } from '../../../context/InvoiceContext/useInvoice';

export const ListarNotaFiscal = () => {
    const { getAllInvoices, loading } = useInvoice();
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        const loadInvoice = async () => {
            const responseInvoices = await getAllInvoices(1);
            setInvoices(responseInvoices);
        };

        loadInvoice();

    }, []);

    const ProcessamentoAutorizadoStatus = () => (
        <>
            <div className="ms-auto badge bg-info">Processamento autorizado</div>
            <span>
                <FontAwesomeIcon
                    icon={faRefresh}
                    size={10}
                    style={{ cursor: 'pointer', marginLeft: 2 }}
                    onClick={() => window.location.reload()}
                />
            </span>
        </>
    );

    const ErroAutorizacaoStatus = ({ invoices }) => (
        <div>
          <div className="ms-auto badge bg-danger" id="tooltip-erro" style={{ cursor: 'pointer' }}>
            Erro
          </div>
          <UncontrolledTooltip placement="top" target="tooltip-erro">
            {invoices?.find((invoice) => invoice.status === 'erro_autorizacao')?.mensagem_sefaz}
          </UncontrolledTooltip>
        </div>
      );

    const statusInvoice = {
        'autorizado': <div className="ms-auto badge bg-success">Autorizado</div>,
        'Processamento autorizado': <ProcessamentoAutorizadoStatus />,
        'erro_autorizacao': <ErroAutorizacaoStatus invoices={invoices} />
    };
    const columns = ['NFe', 'Nº Venda', 'Cliente', 'Data Emissão', 'Situação'];

    const order = invoices?.map(({ numero_nfe, ref, nome_cliente, data_emissao, status }) => ({
        id: numero_nfe,
        numero_venda: ref,
        nome: nome_cliente,
        date: new Date(data_emissao).toLocaleString('pt-br') || ":(",
        status: statusInvoice[status],
    }));

    const handleOpenInvoice = async (id) => {
        const nf = invoices?.find((invoice) => invoice.numero_nfe === id).caminho_pdf
        const url = `https://api.focusnfe.com.br${nf}`
        window.open(url, '_blank')


    };

    const actions = [

        {
            label: 'NFe',
            icon: faFilePdf,
            color: 'purple',
            onClick: (client) => {
                handleOpenInvoice(client.id);
            },
        },

    ];
    return (
        <div> <PageTitle
            heading="Gerenciar Nota Fiscal"
            subheading="Gerenciar emissão de nota fiscal."
            icon="lnr lnr-file-add icon-gradient bg-amy-crisp"
        />
            {loading && <CustomSpinner />}

            <SearchBar
                urlNavigate="/venda/produto/cadastrar"
                columns={columns}
                rows={order}
                msgDelete="Nota Fiscal"
                actions={actions}

            /></div>
    )
}
