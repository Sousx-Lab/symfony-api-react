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

export default {
    findAll,
    delete: deleteInvoices
};