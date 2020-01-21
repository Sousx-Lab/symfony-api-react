import axios from 'axios';

function register(user){
    return axios
           .post("http://symreact.local/api/users", user);
}

export default{
    register
};