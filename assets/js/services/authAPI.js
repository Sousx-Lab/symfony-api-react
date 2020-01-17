import axios from "axios";
import jwtDecode from "jwt-decode";


/**
 * Logout delete token from LocalStorage & axios defaults headers
 */
function logout(){
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

/**
 * HTTP request authentification 
 * @param {obj} credentials 
 */
function authenticate(credentials){
       return axios
            .post("http://symreact.local/api/login_check", credentials)
            .then(response => response.data.token)
            .then(token => {
             // & set token in LocalStorage 
            window.localStorage.setItem("authToken", token);
            // Create a default Header Authorization with token
            setAxiosToken(token);
        });
            
    }
/**
 * Define the header Authorization in axios 
 * @param {string} token 
 */
function setAxiosToken(token){
    axios.defaults.headers["Authorization"] = "Bearer " + token;
}

/**
 * Get token if exist on start the App
 */
function setUp(){
    const token = window.localStorage.getItem("authToken");
    if(token){
        const jwtData = jwtDecode(token)
        if(jwtData.exp * 1000 > new Date().getTime()){
            setAxiosToken(token);
            return jwtData;
        } 
    }
}

/**
 * Check if  Authenticated 
 * @returns boolean
 */
function isAuthenticated(){
    if(setUp()){
       return true;
    }
    return false
}

export default {
    authenticate,
    logout,
    setUp,
    isAuthenticated
}