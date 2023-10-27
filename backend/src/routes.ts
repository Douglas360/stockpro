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
import { InventoryController } from "./controllers/Inventory/InventoryController";
import { CreateBudgetController } from "./controllers/Budget/CreateBudgetController";
import { CreateDashboardController } from "./controllers/Dashboard/CreateDashboardController";

import { upload } from './config/multer'
import { CreateReportController } from "./controllers/Report/CreateReportController";
import { FormPaymentController } from "./controllers/FormPayment/FormPaymentController";
import { TypeSaleController } from "./controllers/TypeSale/TypeSaleController";

const router = Router();

//Health check
router.get("/health", (req, res) => {
    return res.status(200).json({ message: 'OK 1.3.0' });
});

//Company routes
const companyController = new CompanyController();
router.post("/company", companyController.create);
router.get("/company/:id", companyController.listCompanyById);
router.put("/company/:id", upload.single('file'), companyController.update);

//Auth routes
const authUserController = new AuthUserController();
router.post("/session", authUserController.handle);

//router.use(auth)

//User routes
const createUserController = new CreateUserController();
router.post("/user", createUserController.handle);
router.get("/list/user/id_company/:id", createUserController.getAll);
router.delete("/delete/user/:id", createUserController.delete);
router.put("/update/user/:id", createUserController.update);
router.get("/user/:id", createUserController.getUserById);

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
router.post("/product", upload.single('file'), createProductController.create);
router.get("/product/:id", createProductController.get);
router.put("/product/:id",  upload.single('file'), createProductController.update);
router.get("/list/product/id_company?:id", createProductController.getAll);
router.delete("/delete/product/:id", createProductController.delete);
router.delete("/delete/product/file/:id", createProductController.deleteFile);

//SalePrice routes
const createSalePriceController = new CreateSalePriceController();
router.post("/saleprice", createSalePriceController.create);
router.get("/list/saleprice/", createSalePriceController.getAll);
router.put("/update/saleprice/:id", createSalePriceController.update);
router.delete("/delete/saleprice/:id", createSalePriceController.delete);

//Order routes
const createOrderController = new CreateOrderController();
router.post("/order", createOrderController.create);
router.delete("/delete/order/:id", createOrderController.delete);
router.get("/list/order/:id", createOrderController.listOrderByNumber);
router.get("/list/order/id_company/:id", createOrderController.listOrdersByCompany);
router.get("/list/order/id_customer/:id", createOrderController.listOrdersByCustomer);
router.get("/print/order/:id", createOrderController.listOrderToPrint);
router.get("/list/salesstatus", createOrderController.listSalesStatus);
router.put("/update/orderstatus/:id", createOrderController.updateOrderStatus);
router.get("/list/historysalesstatus/:id", createOrderController.listHistorySalesStatus);
router.put("/cancel/order/:id", createOrderController.cancelOrder);
router.put("/update/order/:id", createOrderController.update);

//Budget routes
const createBudgetController = new CreateBudgetController();
router.post("/budget", createBudgetController.create);
router.delete("/delete/budget/:id", createBudgetController.delete);
router.get("/list/budget/:id", createBudgetController.listBudgetByNumber);
router.put("/update/budgetstatus/:id", createBudgetController.updateBudgetStatus);
router.get("/list/budget/id_company/:id", createBudgetController.listBudgetByCompany);
router.get("/list/historybudgetstatus/:id", createBudgetController.listHistoryBudgetStatus);
router.get("/print/budget/:id", createBudgetController.listBudgetToPrint);
router.put("/update/budget/:id", createBudgetController.update);

//Invoice routes
const createInvoiceController = new CreateInvoiceController();
router.post("/invoice", createInvoiceController.create);
router.get("/list/invoice/:ref", createInvoiceController.getInvoiceData);
router.get("/list/invoice/company_id/:id", createInvoiceController.getInvoice);
router.put("/invoice/:id", createInvoiceController.cancelInvoice);

//Inventory routes
const inventoryController = new InventoryController();
router.get("/inventory/:id", inventoryController.handle);

//Dashboard routes
const dashboardController = new CreateDashboardController();
router.get("/dashboard/:id", dashboardController.getTotalConcretizedSales);
router.get("/dashboard/inventory/:id", dashboardController.getInventoryValue);
router.get("/dashboard/inventory/movement/:id", dashboardController.getMovementInventory);
router.get("/dashboard/sales/:id", dashboardController.getSalesByMonth);
router.get("/dashboard/budgets/:id", dashboardController.getBudgetsByMonth);

//Reports routes
const reportController = new CreateReportController();
router.post("/report/customer/:id", reportController.getCustomerReport);
router.post("/report/product/:id", reportController.getProductReport);
router.post("/report/budget/:id", reportController.getBudgetReport);
router.post("/report/sale/:id", reportController.getSaleReport);
router.post("/report/sale/product/:id", reportController.getProductsSalesReport);
router.post("/report/supplier/:id", reportController.getSupplierReport);
router.post("/report/carrier/:id", reportController.getCarrierReport);
router.post("/report/customer/sale/:id", reportController.getCustomersSalesReport);

//Type of payment routes
const createTypeOfPaymentController = new FormPaymentController();
router.get("/formpayment", createTypeOfPaymentController.list);

//Type of sale routes
const createTypeOfSaleController = new TypeSaleController();
router.get("/typesale", createTypeOfSaleController.listTypeSale);























export { router };