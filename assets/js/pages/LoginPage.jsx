import React, { useState, useEffect, useContext } from 'react';
import AuthAPI from "../services/authAPI";
import AuthContext from "../contexts/AuthContext";

const LoginPage = ({ history }) => {

    const { setIsAuthenticated } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;
        setCredentials({ ...credentials, [name]: value });
    }

    const [error, setError] = useState("");
    const handleSubmit = async event => {
        event.preventDefault();
        try {
            await AuthAPI.authenticate(credentials);
            setIsAuthenticated(true)
            history.push("/clients");
        } catch (error) {
            setError("L'adresse email ou le mot de passe incorrect");  
        }
    }
    return (
        <>
            <h3 className="text-center">Connexion</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Adresse email</label>
                    <input value={credentials.username}
                        onChange={handleChange}
                        type="email"
                        className={"form-control " + (error && "is-invalid")}
                        placeholder="Email"
                        name="username"
                        id="username"
                    />
                   {error && 
                   <p className="invalid-feedback">{error}</p>} 
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input value={credentials.password}
                        onChange={handleChange}
                        type="password"
                        className="form-control"
                        placeholder="Mots de passe"
                        name="password"
                        id="password"
                    />
                </div>
                <div className="form-group"><button type="submit" className="btn btn-success">Connexion</button></div>
            </form>
        </>);
}

export default LoginPage;