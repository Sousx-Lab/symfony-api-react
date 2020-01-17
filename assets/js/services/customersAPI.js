import axios from "axios";

function findAll(){
    return axios
           .get("http://symreact.local/api/customers/")
           .then(response => response.data['hydra:member']);
}

function find(id){
    return  axios 
           .get("http://symreact.local/api/customers/" + id)
           .then(response => response.data);
}

function deleteCustomers(id){
    return axios.delete("http://symreact.local/api/customers/" + id)       
}

function update(id , customer){
    return axios.put("http://symreact.local/api/customers/" + id, customer);
}

function create(customer){
    return axios.post("http://symreact.local/api/customers", customer);
}
export default {
    findAll,
    find,
    create,
    update,
    delete: deleteCustomers,
    
};