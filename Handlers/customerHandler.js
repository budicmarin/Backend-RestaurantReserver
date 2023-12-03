import { customers } from "../Models/customerModel.js"

function getCustomer(id) {
    return customers.find(x => x.id == id);

}
function getCustomers() {
    return customers;
}
function addCustomer(newCustomer) {
    customers.push(newCustomer);
    return customers;
}


export const customerMethods = {
    getCustomers,
    getCustomer,
    addCustomer,

}