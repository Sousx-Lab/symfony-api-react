import axios from 'axios';

function create(user){
    return axios
           .post("http://symreact.local/api/users", user);
}

export default{
    create
};