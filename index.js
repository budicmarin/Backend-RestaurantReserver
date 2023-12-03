import { customerMethods } from "./Handlers/customerHandler.js";
import { workersMethods } from "./Handlers/workersHandler.js"
import express from "express";
const app = express();
const router = express.Router();
const port = process.env.port | 3000;


router.route('/customer/id')
    .get((req, res) => {
        const id = req.params?.id;
        const customer = customerMethods.getCustomers(id);
        res.json(customer);
    });
router.route('/customer')
    .get((reqco, res) => {
        const customers = customerMethods.getCustomers();
        res.json(customers);
    });
router.route('/customers')
    .post((req, res, next) => {
        const customerData = req.body;
        customerMethods.addCustomer(customerData);
        res.status(204).json({});
    });

router.route('/worker/id')
    .get((req, res) => {
        const id = req.params?.id;
        const worker = workersMethods.getWorker(id);
        res.json(worker);
    });

router.route('/workers')
    .get((req, res) => {
        const workers = workersMethods.getWorkers();
        req.json(workers);
    });
router.route('/customers')
    .post((req, res, next) => {
        const workerData = req.body;
        workersMethods.addWorker(workerData);
        res.status(204).json({});
    })

app.use(express.json());
app.use("/api", router);
app.listen(port, () => {
    console.log(`Servis radi na portu ${port}`);
});