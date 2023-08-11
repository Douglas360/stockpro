import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faRefresh, faXmarkSquare } from '@fortawesome/free-solid-svg-icons';
import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, UncontrolledTooltip } from 'reactstrap';

import PageTitle from '../../../Layout/AppMain/PageTitle';
import { SearchBar } from '../../../components/SearchBar';
import { CustomSpinner } from '../../../components/CustomSpinner';
import { useInvoice } from '../../../context/InvoiceContext/useInvoice';
import { dateFormatWithHours } from '../../../functions/getFomatter';

export const ListarNotaFiscal = () => {
    const { getAllInvoices, invoiceLoading, cancelInvoice } = useInvoice();
    const [invoices, setInvoices] = useState([]);
    const [cancelModalOpen, setCancelModalOpen] = useState(false);
    const [cancelReason, setCancelReason] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const idEmpresa = (localStorage.getItem('user')) || sessionStorage.getItem('user');
    const id = JSON.parse(idEmpresa).id_empresa;

    useEffect(() => {
        const loadInvoice = async () => {
            const responseInvoices = await getAllInvoices(id);
            setInvoices(responseInvoices);
        };

        loadInvoice();

        // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const ErroAutorizacaoStatus = ({ numero_nfe }) => (
        <div>
            <div className="ms-auto badge bg-danger" id={`tolltip-${numero_nfe}`} style={{ cursor: 'pointer' }}>
                Erro
            </div>
            <UncontrolledTooltip placement="top" target={`tolltip-${numero_nfe}`}>
                {invoices
                    .filter((invoice) => invoice.status === 'erro_autorizacao' && invoice.ref === numero_nfe)
                    .map((invoice) => invoice.mensagem_sefaz)
                    .join(', ')}
            </UncontrolledTooltip>

        </div>
    );

    const ErroCancelamentoStatus = ({ numero_nfe }) => (
        <div>
            <div className="ms-auto badge bg-info" id={`tolltip-${numero_nfe}`} style={{ cursor: 'pointer' }}>
                ERRO CANC.
            </div>
            <UncontrolledTooltip placement="top" target={`tolltip-${numero_nfe}`}>

                {invoices
                    .filter((invoice) => invoice.status === 'erro_cancelamento' && invoice.ref === numero_nfe)
                    .map((invoice) => invoice.mensagem_sefaz)
                    .join(', ')}

            </UncontrolledTooltip>
        </div>
    );

    const renderStatus = (status, ref) => {
        switch (status) {
            case 'autorizado':
                return <div className="ms-auto badge bg-success">Autorizado</div>;
            case 'cancelada':
                return <div className="ms-auto badge bg-warning">Cancelado</div>;
            case 'erro_cancelamento':
                return <ErroCancelamentoStatus numero_nfe={ref} />;
            case 'Processamento autorizado':
                return <ProcessamentoAutorizadoStatus />;
            case 'erro_autorizacao':
                return <ErroAutorizacaoStatus numero_nfe={ref} />;
            default:
                return <div className="ms-auto badge bg-info">Processando</div>;
        }
    };
    const columns = ['NFe', 'Nº Venda', 'Cliente', 'Data Emissão', 'Situação'];
    const columnsToFilter = ['nome', 'email', 'telefone', 'celular'];

    const order = invoices?.map(({ numero_nfe, ref, nome_cliente, data_emissao, status }) => ({
        id: numero_nfe,
        numero_venda: ref,
        nome: nome_cliente,
        //date: new Date(data_emissao).toLocaleString('pt-br') || ":(",
        date: dateFormatWithHours(data_emissao),
        status: renderStatus(status, ref)
    }));

    const handleOpenInvoice = async (id) => {
        const nf = invoices?.find((invoice) => invoice.numero_nfe === id).caminho_pdf
        const url = `https://api.focusnfe.com.br${nf}`
        window.open(url, '_blank')


    };


    const handleCancelInvoice = async (id) => {
        setSelectedItem(id);
        setCancelModalOpen(true);
    }

    const handleConfirmCancelInvoice = async (reason) => {
        const data = {
            id: selectedItem.numero_venda,
            reason: reason
        }
        await cancelInvoice(data);
        setCancelModalOpen(false);
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
        {
            label: 'Cancelar',
            icon: faXmarkSquare,
            cursor: 'pointer',
            color: 'orange',
            onClick: (client) => {
                handleCancelInvoice(client);
            },

        }

    ];
    return (
        <div> <PageTitle
            heading="Gerenciar Nota Fiscal"
            subheading="Gerenciar emissão de nota fiscal."
            icon="lnr lnr-file-add icon-gradient bg-amy-crisp"
        /> {invoiceLoading && <CustomSpinner />}
           
            <SearchBar
                urlNavigate="/venda/produto/cadastrar"
                columns={columns}
                columnsToFilter={columnsToFilter}
                rows={order}
                msgDelete="Nota Fiscal"
                actions={actions}
                noActions={true}
            />
            {/* Cancel Modal */}
            <Modal isOpen={cancelModalOpen} toggle={() => setCancelModalOpen(false)}>
                <ModalHeader toggle={() => setCancelModalOpen(false)}>
                    <span style={{ fontWeight: 'bold' }}>{`Cancelar Nota Fiscal: ${selectedItem?.numero_venda}`}</span>
                </ModalHeader>
                <ModalBody>
                    <Label style={{ fontWeight: 'bold' }}>Motivo do cancelamento</Label><span className='text-danger'>*</span>
                    <Input
                        required
                        type='textarea'
                        value={cancelReason}
                        onChange={(e) => setCancelReason(e.target.value)}
                        name='cancelReason'
                        id='cancelReason'
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => setCancelModalOpen(false)}>
                        Cancelar
                    </Button>
                    <Button color="danger" onClick={() => handleConfirmCancelInvoice(cancelReason)}>
                        Confirmar Cancelamento
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
