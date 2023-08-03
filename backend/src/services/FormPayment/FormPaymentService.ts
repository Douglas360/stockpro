import prismaClient from "../../prisma";

class FormPaymentService {


    async list() {
        const formPayments = await prismaClient.formaPagamento.findMany();
        return formPayments;
    }

}export { FormPaymentService }