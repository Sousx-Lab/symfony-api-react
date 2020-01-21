import React, { useState, useEffect } from 'react';
import Field from '../components/forms/Field';
import { Link } from 'react-router-dom';
import CustomersAPI from "../services/customersAPI";
import { toast } from 'react-toastify';
import FormsRowLoader from '../components/loaders/FormsRowLoader';

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
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);

    //Récupération du customer en fonction de l'id
    const fetchCustomer = async id => {
        try {
            const { firstname, lastname, email, company } = await CustomersAPI.find(id);
            setCustomer({firstname, lastname, email, company});
            setLoading(false);
        } catch (error) {
            toast.error("Une erreur est survenu lors du chargement du client");
            history.replace("/clients");
        } 
    }
    // Verifie si on est sur l'edition ou sur la création d'un customer      
    useEffect(() =>{
        if(id !== "new") {
         setLoading(true);
         setEditing(true);
         fetchCustomer(id);
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
            setErrors({});
            if(editing){
                await CustomersAPI.update(id, customer)
                toast.success("Les modifications on bien été enregistrée")
            }else{
                await CustomersAPI.create(customer)
                toast.success("Le nouveau client a bien été crée");
                history.replace("/clients")
            }
        } catch ({ response }) {
            const { violations } = response.data;
            if(violations){
                const apiErrors = {};
                violations.map(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);
                toast.error("Des erreurs dans le formulaire !")
            }
        } 
    };

    return ( 
     <>
        <h1 className="mb-4"> {!editing && "Créer un nouveau client" ||"Modification du client"} </h1>
        {loading && <FormsRowLoader />}
        {!loading && (
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
            <Link className="ml-2 btn btn-link" to="/clients">Retour à la liste</Link>
          </div>
       </form>
       )}
        </>
    );
}
 
export default CustomerPage;