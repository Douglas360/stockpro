import { Router } from "express";
import { CompanyController } from "./controllers/Register/Company/CompanyController";
import { CreateUserController } from "./controllers/User/CreateUserController";
import { AuthUserController } from "./controllers/User/AuthUserController";
import { CreateCustomerController } from "./controllers/Register/Customer/CreateCustomerController";
import { CreateSupplierController } from "./controllers/Register/Supplier/CreateSupplierController";
import { CreateCarrierController } from "./controllers/Register/Carrier/CreateCarrierController";
import { CreateProductController } from "./controllers/ProductManagment/Product/CreateProductController";
import { CreateSalePriceController } from "./controllers/ProductManagment/SalePrice/CreateSalePriceController";
import { CreateOrderController } from "./controllers/Order/Product/CreateOrderController";
import { CreateInvoiceController } from "./controllers/Invoice/CreateInvoiceController";
import { auth } from "./middleware/auth";

const router = Router();

//Company routes
const companyController = new CompanyController();
router.post("/company", companyController.create);

//Auth routes
const authUserController = new AuthUserController();
router.post("/session", authUserController.handle);

//router.use(auth)

//User routes
const createUserController = new CreateUserController();
router.post("/user", createUserController.handle);

//Customer routes
const createCustomerController = new CreateCustomerController();
router.post("/customer", createCustomerController.create);
router.get("/customer/:id", createCustomerController.get);
router.put("/customer/:id", createCustomerController.update);
router.get("/list/customer/id_company?:id", createCustomerController.getAll);
router.delete("/delete/customer/:id", createCustomerController.delete);

//Supplier routes
const createSupplierController = new CreateSupplierController();
router.post("/supplier", createSupplierController.create);
router.get("/supplier/:id", createSupplierController.get);
router.put("/supplier/:id", createSupplierController.update);
router.get("/list/supplier/id_company?:id", createSupplierController.getAll);
router.delete("/delete/supplier/:id", createSupplierController.delete);

//Carrier routes
const createCarrierController = new CreateCarrierController();
router.post("/carrier", createCarrierController.create);
router.get("/carrier/:id", createCarrierController.get);
router.put("/carrier/:id", createCarrierController.update);
router.get("/list/carrier/id_company?:id", createCarrierController.getAll);
router.delete("/delete/carrier/:id", createCarrierController.delete);

//Product routes
const createProductController = new CreateProductController();
router.post("/product", createProductController.create);
router.get("/product/:id", createProductController.get);
router.put("/product/:id", createProductController.update);
router.get("/list/product/id_company?:id", createProductController.getAll);
router.delete("/delete/product/:id", createProductController.delete);

//SalePrice routes
const createSalePriceController = new CreateSalePriceController();
router.post("/saleprice", createSalePriceController.create);
router.get("/list/saleprice/", createSalePriceController.getAll);

//Order routes
const createOrderController = new CreateOrderController();
router.post("/order", createOrderController.create);
router.get("/list/order/id_company/:id", createOrderController.listOrdersByCompany);
router.get("/list/order/id_customer/:id", createOrderController.listOrdersByCustomer);

//Invoice routes
const createInvoiceController = new CreateInvoiceController();
router.post("/invoice", createInvoiceController.create);
router.get("/list/invoice/:ref", createInvoiceController.getInvoiceData);
router.get("/list/invoice/company_id/:id", createInvoiceController.getInvoice);

















export { router };