import axios, { AxiosRequestConfig } from 'axios';
import prismaClient from '../../prisma';
import { OrderData } from '../../types/OrderDataTypes';
import { CreateInvoiceServiceRequest } from '../../types/CreateInvoiceTypes';
import { DateTime } from 'luxon';

// Configure o cabeçalho da requisição com o método HTTP Basic Auth
/*const config: AxiosRequestConfig = {
  auth: {
    username: process.env.TOKEN_API_NF as string,
    password: '',
  },
  headers: {
    'Content-Type': 'application/json',
  },
};*/

class CreateInvoiceService {


  async create(requestData: CreateInvoiceServiceRequest): Promise<any> {
    const dataHoraAtual: string | null = DateTime.now().setZone('America/Sao_Paulo').toISO()!
    try {
      if (!requestData.orderId) {
        throw new Error('Missing orderId');
      }

      //Pesquisar a venda no banco de dados atraves do numero da venda
      const order = await prismaClient.venda.findFirst({
        where: {
          numero_venda: Number(requestData.orderId)
        },
        include: {
          empresa: true,
          cliente: {
            include: {
              enderecos: true
            }
          },
          itens: {
            include: {
              produto: true
            }
          }

        }

      });
      if (!order) {
        throw new Error('Order not found');
      }
      // Verify if all products in the order have codigo_ncm
      const hasMissingNcm = order.itens.some(item => !item.produto.codigo_ncm);
      const nameOfProductMissingNcm = order.itens.find(item => !item.produto.codigo_ncm)?.produto.nome;
      if (hasMissingNcm) {
        throw new Error(`Produto: ${nameOfProductMissingNcm} não possui codigo_ncm`);
      }
      //Verify if all products in the order have cfop
      const hasMissingCfop = order.itens.some(item => !item.produto.cfop);
      //get name of the product that is missing cfop and ncm to show in the error message 
      const nameOfProductMissingCfop = order.itens.find(item => !item.produto.cfop)?.produto.nome;
      if (hasMissingCfop) {
        throw new Error(`Produto: ${nameOfProductMissingCfop} não possui cfop`);
      }

      if (!order.empresa?.nome) {
        throw new Error('Missing nome');
      }
      if (!order.empresa?.nome_fantasia) {
        throw new Error('Falta atualizar o nome fantasia da empresa');
      }
      if (!order.empresa?.inscr_estadual) {
        throw new Error('Falta atualizar a inscrição estadual da empresa')
      }

      let valor_produto
      let valorFretePorItem = 0
      if (order.valor_frete) {
        valor_produto = order.valor_total - order.valor_frete
        valorFretePorItem = order?.valor_frete / order?.itens.length;
      } else {
        valor_produto = order.valor_total
      }

      console.log(dataHoraAtual)
      const orderMapped: OrderData = {
        natureza_operacao: requestData.natureza_operacao,
        numero: requestData.numero_nota,
        serie: requestData.tipo_documento,
        //data_emissao: order.data_venda.toISOString(),
        //data_entrada_saida: order.data_venda.toISOString(),
        //data_emissao: new Date().toISOString(),
        //data_entrada_saida: new Date().toISOString(),
        data_emissao: dataHoraAtual !== null ? dataHoraAtual : new Date().toISOString(),
        data_entrada_saida: dataHoraAtual !== null ? dataHoraAtual : new Date().toISOString(),
        tipo_documento: requestData.tipo_documento,
        local_destino: requestData.local_destino,
        finalidade_emissao: requestData.finalidade_emissao,
        cnpj_emitente: order.empresa?.cnpj as string,
        nome_emitente: order.empresa?.nome as string,
        nome_fantasia_emitente: order.empresa?.nome_fantasia as string,
        logradouro_emitente: order.empresa?.logradouro as string,
        numero_emitente: order.empresa?.numero as string,
        bairro_emitente: order.empresa?.bairro as string,
        municipio_emitente: order.empresa?.cidade as string,
        uf_emitente: order.empresa?.estado as string,
        cep_emitente: order.empresa?.cep as string,
        inscricao_estadual_emitente: order.empresa?.inscr_estadual as string,
        nome_destinatario: order.cliente?.nome as string,
        cnpj_destinatario: order.cliente?.cnpj as string,
        inscricao_estadual_destinatario: order.cliente?.inscricao_estadual as string,
        telefone_destinatario: order.cliente?.telefone as string,
        logradouro_destinatario: order.cliente?.enderecos[0].rua as string,
        numero_destinatario: order.cliente?.enderecos[0].numero as string,
        bairro_destinatario: order.cliente?.enderecos[0].bairro as string,
        municipio_destinatario: order.cliente?.enderecos[0].cidade as string,
        uf_destinatario: order.cliente?.enderecos[0].estado as string,
        pais_destinatario: 'Brasil',
        cep_destinatario: order.cliente?.enderecos[0].cep as string,
        valor_frete: order.valor_frete as number | 0,
        //valor_frete: 0,
        valor_seguro: 0,
        valor_total: order.valor_total as number,
        valor_produtos: valor_produto as number,
        modalidade_frete: 0,
        informacoes_adicionais_contribuinte: requestData.informacoes_adicionais_contribuinte,
        items: order.itens.map(item => {
          return {
            valor_frete: valorFretePorItem,
            numero_item: item.numero_item as number,
            codigo_produto: item?.produto?.codigo_interno as string,
            descricao: item.produto.nome,
            //cfop: Number(item.produto.cfop),
            cfop: Number(requestData.cfop),
            unidade_comercial: 'UN',
            quantidade_comercial: item.quantidade,
            valor_unitario_comercial: item.valor_unitario,
            valor_unitario_tributavel: item.valor_unitario,
            unidade_tributavel: 'UN',
            codigo_ncm: item.produto.codigo_ncm as unknown as number,
            quantidade_tributavel: item.quantidade,
            valor_bruto: item.valor_total,
            icms_situacao_tributaria: 102,
            icms_origem: 0,
            pis_situacao_tributaria: '07',
            cofins_situacao_tributaria: '07',
          }
        })
      }

      /* const ref = order?.numero_venda;
 
 
       const url = `${process.env.URL_API_NF}/v2/nfe?ref=${ref}`;
       const secondUrl = `${process.env.URL_API_NF}/v2/nfe/${ref}?completa=1`;
       const token = order.empresa?.token_nfe as string
 
       const config: AxiosRequestConfig = {
         auth: {
           username: token,
           password: '',
         },
         headers: {
           'Content-Type': 'application/json',
         },
       };
 
       await axios.post(url, orderMapped, config);
 
       //Verificar se a nf já existe no banco de dados e se não existir criar
 
       let nf = await prismaClient.notaFiscal.findFirst({
         where: {
           ref: String(ref)
         }
       })
      
       if (!nf) {
         nf = await prismaClient.notaFiscal.create({
           data: {
             //id_empresa: 2, // Alterar para pegar o id da empresa
             id_empresa: requestData.id_empresa,
             ref: String(ref),
             status: 'Processamento autorizado',
           }
         })
       } else {
         nf = await prismaClient.notaFiscal.update({
           where: {
             ref: nf.ref as string
           },
           data: {
             status: 'Processamento autorizado',
           }
         })
       }
 
       //Cria timeout para pegar os dados da nf
       setTimeout(async () => {
         const secondResponse = await axios.get(secondUrl, config);
         const secondResponseData = secondResponse.data;
 
 
         console.log(secondResponseData.requisicao_nota_fiscal.data_emissao)
         //Atualiza nf no banco de dados
         await prismaClient.notaFiscal.update({
           where: {
             ref: nf?.ref as string
           },
           data: {
             status: secondResponseData.status,
             status_sefaz: secondResponseData.status_sefaz,
             mensagem_sefaz: secondResponseData.mensagem_sefaz,
             chave_nfe: secondResponseData.chave_nfe,
             numero_nfe: secondResponseData.numero,
             caminho_xml: secondResponseData.caminho_xml_nota_fiscal,
             caminho_pdf: secondResponseData.caminho_danfe,
             //data_emissao: secondResponseData.requisicao_nota_fiscal.data_emissao,
             data_emissao: dataHoraAtual
           }
         })
       }, 10000)*/

      return orderMapped
    } catch (error: any) {
      if (error.response && error.response.data && typeof error.response.data === 'object') {
        const { mensagem, erros, mensagem_sefaz } = error.response.data;
        console.log(error.response.data)
        const message = mensagem || erros[0].mensagem || mensagem_sefaz;

        throw new Error(message);


      } else {
        throw new Error(error.message);
      }
    }

  }
  async getInvoiceData(ref: number): Promise<void> {
    try {
      //pegar o token_nfe atraves do numero de referencia da venda vinculada a empresa
      const token = await prismaClient.venda.findFirst({
        where: {
          id_venda: ref
        },
        include: {
          empresa: {
            select: {
              token_nfe: true
            }
          }
        }
      })
      console.log("VERIFICAR: " + token)
      const config: AxiosRequestConfig = {
        auth: {
          //username: process.env.TOKEN_API_NF as string,
          username: token?.empresa?.token_nfe as string,
          password: '',
        },
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const secondUrl = `${process.env.URL_API_NF}/v2/nfe/${ref}?completa=1`;

      const response = await axios.get(secondUrl, config);

      return response.data
    } catch (error: any) {
      if (error.response && error.response.data && typeof error.response.data === 'object') {
        const { mensagem, erros, mensagem_sefaz } = error.response.data;
        console.log(error.response.data)
        const message = mensagem || erros[0].mensagem || mensagem_sefaz;

        throw new Error(message);


      } else {
        throw new Error(error.message);
      }
    }
  }
  async getInvoice(company_id: number): Promise<any> {
    try {
      const response = await prismaClient.notaFiscal.findMany({
        where: {
          id_empresa: company_id
        },
        orderBy: {
          id_nfe: 'desc'
        },

      })

      const mappedResponse = await Promise.all(response.map(async (nf) => {
        const venda = await prismaClient.venda.findFirst({
          where: {
            numero_venda: Number(nf.ref)
          },
          include: {
            cliente: true
          }
        });

        const nomeCliente = venda?.cliente?.nome ?? "Nome do Cliente Desconhecido";

        return {
          id_nfe: nf.id_nfe,
          ref: nf.ref,
          status: nf.status,
          status_sefaz: nf.status_sefaz,
          mensagem_sefaz: nf.mensagem_sefaz,
          chave_nfe: nf.chave_nfe,
          numero_nfe: nf.numero_nfe,
          caminho_xml: nf.caminho_xml,
          caminho_pdf: nf.caminho_pdf,
          data_emissao: nf.data_emissao,
          nome_cliente: nomeCliente
        };
      }));

      return mappedResponse

    } catch (error: any) {
      throw new Error(error.message);
    }


  }
  async cancelInvoice(id_nfe: string, reason: string): Promise<any> {
    try {
      const nf = await prismaClient.notaFiscal.findFirst({
        where: {
          ref: id_nfe
        },
        include: {
          empresa: {
            select: {
              token_nfe: true
            }
          }
        }
      });

      if (!nf) {
        throw new Error('Nota fiscal não encontrada');
      }

      const url = `${process.env.URL_API_NF}/v2/nfe/${nf.ref}`;

      const cancelData = {
        justificativa: reason
      }
      const token = nf.empresa?.token_nfe
      const config: AxiosRequestConfig = {
        auth: {
          //username: process.env.TOKEN_API_NF as string,
          username: token as string,
          password: '',
        },
        headers: {
          'Content-Type': 'application/json',
        },
        data: cancelData
      };

      const response = await axios.delete(url, config);

      if (response.data.status === 'erro_cancelamento') {
        await prismaClient.notaFiscal.update({
          where: {
            ref: id_nfe
          },
          data: {
            status: 'erro_cancelamento',
            status_sefaz: response.data.status_sefaz,
            mensagem_sefaz: response.data.mensagem_sefaz,

          }
        })
      } else if (response.data.status === 'cancelado') {
        await prismaClient.notaFiscal.update({
          where: {
            ref: id_nfe
          },
          data: {
            status: 'cancelada',
            status_sefaz: response.data.status_sefaz,
            mensagem_sefaz: response.data.mensagem_sefaz,
          }
        })
      }

      return response.data

    } catch (error: any) {
      //console.log(error.response)
      if (error.response && error.response.data && typeof error.response.data === 'object') {
        const { mensagem, erros, mensagem_sefaz } = error.response.data;
        //console.log(error.response.data)
        const message = mensagem || erros[0].mensagem || mensagem_sefaz;
        if (message === 'A nota fiscal já foi cancelada') {
          await prismaClient.notaFiscal.update({
            where: {
              ref: id_nfe
            },
            data: {
              status: 'cancelada'
            }
          })
        }
        throw new Error(message);
      }
    }

  }
}
export { CreateInvoiceService };

