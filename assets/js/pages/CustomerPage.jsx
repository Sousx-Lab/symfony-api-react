import React, { useState, useEffect } from 'react';
import Field from '../components/forms/Field';
import { Link } from 'react-router-dom';
import CustomersAPI from "../services/customersAPI";

const CustomerPage = ({match, history}) => {
    const {id = "new"} = match.params;

    const [customer, setCustomer] = useState({
        lastname: "",
        firstname: "",
        email: "",
        company: "",

    });

    const [errors, setErrors] = useState({
        lastname:"",
        firstname:"",
        email:"",
        company:"",
    });

    const [editing, setEditing] = useState(false);

    //Récupération du customer en fonction de l'id
    const fetchCustomer = async id => {
        try {
            const { firstname, lastname, email, company } = await CustomersAPI.find(id);
            setCustomer({firstname, lastname, email, company});
        } catch (error) {
            //TODO : Flsh notification d'erreurs
            history.replace("/clients");
        } 
    }
    // Verifie si on est sur l'edition ou sur la création d'un customer      
    useEffect(() =>{
        if(id !== "new") {
         setEditing(true);
         fetchCustomer(id)
        } 
    }, [id])
    
    //Gestion des changement des input du formulaire
    const handleChange = ({currentTarget}) => {
        const {name, value } = currentTarget;
        setCustomer({...customer, [name]: value });
    };

    //Gestion de la sumission du formulaire
    const handleSubmit = async event => {
        event.preventDefault();
        try {
            if(editing){
                await CustomersAPI.update(id, customer)
                    //TODO : Flash de notification de succés
            }else{
                await CustomersAPI.create(customer)
                    // TODO: Flash notification de succés
                history.replace("/clients")
            }
         setErrors({});
         // TODO: Flash de notification d'erreurs 
        } catch ({ response }) {
            const { violations } = response.data;
            if(violations){
                const apiErrors = {};
                violations.map(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);
            }
        } 
    };

    return ( 
     <>
        <h1 className="mb-4"> {!editing && "Créer un nouveau client" ||"Modification du client"} </h1>  
            <form onSubmit={handleSubmit}> 
              <Field 
                name="lastname" 
                 value={customer.lastname}
                  label="Nom de famille"
                    placeholder="Nom de famille du client"
                     onChange={handleChange}
                      error={errors.lastname}
                />
                <Field 
                name="firstname"
                 value={customer.firstname}
                  label="Prénom" 
                   placeholder="Prénom du client"
                    onChange={handleChange}
                     error={errors.firstname}
                />
               <Field 
                name="email" 
                 value={customer.email}
                  label="Email" 
                   placeholder="Adresse email du client" 
                    type="email"
                     onChange={handleChange}
                      error={errors.email}
            />
            <Field 
            name="company" 
             value={customer.company}
              label="Entreprise" 
               placeholder="Entreprise du client"
                onChange={handleChange}
                 error={errors.company}
            />

         <div className="form-group">
             <button type="submit" className="btn btn-success">Enregistrer</button>
            <Link className="ml-2 btn btn-danger" to="/clients">Annuler</Link>
          </div>
       </form>
        </>
    );
}
 
export default CustomerPage;