import axios from "axios";

function findAll(){
    return axios
           .get("http://symreact.local/api/invoices/")
           .then(response => response.data['hydra:member']);
}

function deleteInvoices(id){
    return axios
           .delete("http://symreact.local/api/invoices/" + id)
}

function find(id){
    return axios
            .get("http://symreact.local/api/invoices/" + id)
            .then(response => response.data);
}

function update(id, invoice){
    return axios
           .put("http://symreact.local/api/invoices/" + id, {...invoice, 
            customer: `api/customers/${invoice.customer}`});
}

function create(invoice){
    return axios
           .post("http://symreact.local/api/invoices", {...invoice, 
            customer: `api/customers/${invoice.customer}`});
}

export default {
    findAll,
    find,
    create,
    update,
    delete: deleteInvoices
};