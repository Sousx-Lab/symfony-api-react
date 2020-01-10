import axios from "axios";

function findAll(){
    return axios
           .get("http://symreact.local/api/customers/")
           .then(response => response.data['hydra:member']);
}

function deleteCustomers(id){
    return axios
           .delete("http://symreact.local/api/customers/" + id)
}

export default {
    findAll,
    delete: deleteCustomers
};