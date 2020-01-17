import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Field from '../components/forms/Field';
import Select from '../components/forms/select';
import CustomersAPI from "../services/customersAPI";
import InvoicesAPI from "../services/invoicesAPI";
import axios from "axios";


const InvoicePage = ({ match, history }) => {
    const {id = "new"} = match.params;

    const [invoice , setInvoice] = useState({
        amount: "",
        status: "",
        customer: ""

    });

    const [customers, setCustomers] = useState([]);

    const [errors, setErrors] = useState({
        amount: "",
        status: "",
        customer: ""
    });

    const [editing, setEditing] = useState(false);

    //Récupération de la liste des clients
    const fetchCustomers = async () => {
        try {
            const data = await CustomersAPI.findAll();
            setCustomers(data);
        } catch (error) {
            history.replace('/factures');
            //TODO : notification client non trouvé
        }
    }

    //Récupération d'un facture
    const fetchInvoice = async id => {
        try {
            const { amount, status, customer } = await InvoicesAPI.find(id)
            setInvoice({ amount, status, customer: customer.id });     
        } catch (error) {
            //TODO : falsh notification invoice non trouvé 
            history.replace('/factures');
        }
    };
    
    //Récupération de la liste des clients au chargement de la page
    useEffect(() => {
        fetchCustomers();
    }, []);

    //Véfirie si on est sur l'edition ou la création et récupére la facture avec id dans l'URL pour l'edition
    useEffect(() => {
        if(id !== "new"){
           setEditing(true);
           fetchInvoice(id);
         }
       }, [id]);

    //Setter les valeur lors du changement dans le formulaire...
    const handleChange = ({ currentTarget }) => {
        const {name, value} = currentTarget;
        setInvoice({...invoice, [name]: value});
    };

    //Gestion de la soumission du formulaire...
    const handleSubmit = async event => {
        event.preventDefault();
        if(!invoice.customer){
            setErrors({ customer: "Veuillez choisir un client pour cette facture" });
        }else if
            (!invoice.status) setErrors({ status: "Veuillez choisir le statut de la facture" });
        else 
        try {
           if(editing){
               await InvoicesAPI.update(id, invoice);
               //TODO: flash notification success
           } else {
               await InvoicesAPI.create(invoice);
           //TODO : flash notification succes
               history.replace("/factures");
          }  
        } catch (error) {
            const { violations } = error.response.data;
            if(violations){
                const apiErrors = {};
                violations.map(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors)
                //TODO : flash notification error
            }
        }
    };

    return (
    <> 
     <h1 className="mb-4"> {!editing && "Créer une nouvelle facture" || "Modification de la facture"}</h1>
        <form onSubmit={handleSubmit}>
            <Field 
             name="amount"
               type="number"
                value={invoice.amount}
                 label="Montant"
                  placeholder="Montant de la facture"
                   onChange={handleChange}//
                    error={errors.amount}
                />
            <Select
            name="customer" 
                label="Client" 
                 value={invoice.customer}
                  error={errors.customer}
                    onChange={handleChange}>

                    <option value="">Liste des clients...</option>
                    {customers.map(customer => 
                    <option 
                    key={customer.id} 
                     value={customer.id}>
                      {customer.firstname} {customer.lastname}
                    </option>
                    )}
                </Select>

                <Select
                name="status"
                 label="Statut"
                  value={invoice.status}
                   error={errors.status}
                    onChange={handleChange}>

                    <option value="">Etat de la facture...</option>
                    <option value="SENT">Envoyée</option>
                    <option value="PAID">Payée</option>
                    <option value="CANCELED">Annulée</option>
                </Select>
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                    <Link className="ml-2 btn btn-danger" to="/factures">Annuler</Link>
                </div> 
            </form>
         </>
    );
}
 
export default InvoicePage;