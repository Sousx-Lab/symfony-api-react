import React, { useState } from 'react';
import Field from "../components/forms/Field";
import { Link } from 'react-router-dom';
import registerAPI from '../services/registerAPI';
import { toast } from 'react-toastify';

const RegisterPage = ({ history }) => {

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    const handleChange = ({currentTarget}) => {
          const {name, value} = currentTarget;
          setUser({...user, [name]: value});
    }

    const handleSubmit = async event =>{
        event.preventDefault()
        try {
            await registerAPI.register(user)
            toast.success("Votre compte à bien été crée !");
            history.replace("/login");
            
        } catch (error) {
            const { violations } = error.response.data;
            if(violations){
                const apiErrors = {};
                violations.map(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message
                });
                setErrors(apiErrors);
                toast.error("Des erreurs dans votre formulaire ")
            }
        }
    }

    return (<>

        <h1>Inscription !</h1>

        <form onSubmit={handleSubmit}>
        <Field
          name="firstName"
           value={user.firstName}
            label="Prénom"
             placeholder="Votre Prénom"
              onChange={handleChange}
               error={errors.firstName}
        />
         <Field
          name="lastName"
           value={user.lastName}
            label="Nom"
             placeholder="Votre Nom de famille"
              onChange={handleChange}
               error={errors.lastName}
        />
         <Field
          name="email"
           type="email"
            value={user.email}
             label="Adresse Email"
              placeholder="exemple@email.com"
               onChange={handleChange}
                error={errors.email}
        />
        <Field
          name="password"
           type="password"
            value={user.password}
             label="Mot de passe"
              placeholder="Votre mot de passe de connexion"
               onChange={handleChange}
                error={errors.password}
        />
        <Field
          name="passwordConfirm"
           type="password"
            value={user.passwordConfirm}
             label="Confirmation de mot de passe"
              placeholder="Confirmez votre mot de passe de connexion"
               onChange={handleChange}
                error={errors.passwordConfirm}
        />
        <div className="form-group">
        <button type="submit" className="btn btn-success">Confirmation</button>
        <Link to="/login" className="btn btn-link">J'ai déja un compte</Link>
      </div>
     </form>
    </>  
    );
}
 
export default RegisterPage;