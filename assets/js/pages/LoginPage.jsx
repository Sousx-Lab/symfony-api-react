import React, { useState, useEffect, useContext } from 'react';
import AuthAPI from "../services/authAPI";
import AuthContext from "../contexts/AuthContext";
import Field from '../components/forms/Field';
import { toast } from 'react-toastify';

const LoginPage = ({ history, user }) => {

    const { setIsAuthenticated } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const handleChange = ({ currentTarget }) => {
        const { value, name } = currentTarget;
        setCredentials({ ...credentials, [name]: value });
    }

    const [error, setError] = useState("");
    const handleSubmit = async event => {
        event.preventDefault();
        try {
            await AuthAPI.authenticate(credentials);
            setIsAuthenticated(true);
            toast.info("Bonjour  " + user.firstname + " 🤗 ");
            history.replace("/clients");
        } catch (error) {
            setError("L'adresse email ou le mot de passe incorrect");
            toast.error("Une erreur est survenue !")
        }
    }
    return (
        <>
            <h3 className="text-center">Connexion</h3>
            <form onSubmit={handleSubmit}>
                <Field 
                type="email" 
                 name="username" 
                  label="Adresse Email" 
                   alue={credentials.username}
                     onChange={handleChange} 
                       placeholder="Adresse Email" 
                        error={error} 
                />

                <Field 
                type="password" 
                 name="password" 
                  label="Mots de passe" 
                   value={credentials.password}
                    onChange={handleChange} 
                     placeholder="Mot de passe" 
                      error=""
                />

                <div className="form-group">
                   <button type="submit" className="btn btn-success">Connexion</button>
                </div>
            </form>
        </>
    );
}

export default LoginPage;