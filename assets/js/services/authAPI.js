import axios from "axios";
import jwtDecode from "jwt-decode";
import User from "./user";
import Cache from "./cache";
import {LOGIN_API} from "./config";

/**
 * Logout delete token from LocalStorage & axios defaults headers
 */
function logout(){
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
    Cache.invalidate("customers");
}

/**
 * HTTP request authentification 
 * @param {obj} credentials 
 */
function authenticate(credentials){
       return axios
            .post(LOGIN_API, credentials)
            .then(response => response.data.token)
            .then(token => {
             // & set token in LocalStorage 
            window.localStorage.setItem("authToken", token);
            // Create a default Header Authorization with token
            setAxiosToken(token);
            User.set(jwtDecode(token));
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
 * Get token if exist on start App
 */
function setUp(){
    const token = window.localStorage.getItem("authToken");
    if(token){
        const jwtData = jwtDecode(token)
        if(jwtData.exp * 1000 > new Date().getTime()){
             setAxiosToken(token);
             User.set(jwtData);
             return true;
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