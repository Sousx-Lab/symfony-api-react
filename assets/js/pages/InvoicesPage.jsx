import React, { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';
import InvoicesAPI from '../services/invoicesAPI';

const STATUS_CLASSES = {
    PAID: "success",
    SENT: "info",
    CANCELED: "danger"
};

const STATUS_LABELS = {
    PAID: "Payée",
    SENT: "Envoyée",
    CANCELED: "Annulée"
};

const InvoicesPage = (props) => {

    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    // Get Invoices //
    const fetchInvoices = async () => {
        try {
          const data = await InvoicesAPI.findAll()
          setInvoices(data);
        } catch(error) {
            console.log(error.response);
        }
    };
    useEffect(() => {
      fetchInvoices();
    }, []);
    // END // 

    const handelDelete = async id => {
        const originalInvoices = [...invoices];
        setInvoices(invoices.filter(invoice => invoice.id !== id));
        try {
           await InvoicesAPI.delete(id)
        } catch (error) {
            setInvoices(originalInvoices)
            console.log(error.response);
            
        }
    };

    // Search Manager //
    const handleSearch = ({ currentTarget }) => {
    setSearch(currentTarget.value);
    setCurrentPage(1);
  }

  // Search filter //
  const filtredInvoices = invoices.filter(
    i => i.customer.firstname.toLowerCase().includes(search.toLowerCase()) || 
    i.customer.lastname.toLowerCase().includes(search.toLowerCase()) ||
    i.amount.toString().startsWith(search.toLowerCase()) ||
    STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase())
    );
    //END /// 


    //Pagination //

    const handlePageChange = page => setCurrentPage(page);
    const itemsPerPage = 10;

    const paginatedInvoices = Pagination.getData(
        filtredInvoices,
        currentPage,
        itemsPerPage
    );


    return ( 
    <>
        <h1>Liste des Factures !</h1>
        <div className="form-group">
        <input type="text" onChange={handleSearch} value={search} className="form-control" placeholder="Rechercher..."/>
      </div>
        <table className="table table-over">
            <thead>
                <tr>
                    <td>Numéro</td>
                    <td >Client</td>
                    <td className="text-center">Date d'envoi</td>
                    <td className="text-center">Statu</td>
                    <td className="text-center">Montant</td>
                    <td className="text-center">Action</td>
                </tr>
            </thead>
            <tbody>
            {paginatedInvoices.map(invoice => (
                  <tr key={invoice.id}>
                    <td>{invoice.chrono}</td>
                    <td>
                    <a href="#">{invoice.customer.firstname} {invoice.customer.lastname}</a>
                    </td>
                    <td className="text-center">{new Date(invoice.sentAt).toLocaleDateString()}</td>
                    <td className="text-center">
                        <span className={"badge badge-" + STATUS_CLASSES[invoice.status]}>
                        {STATUS_LABELS[invoice.status]}</span>
                    </td>
                    <td className="text-center">{invoice.amount.toLocaleString()} €</td>
                    <td className="text-center">
                      <button className="btn btn-sm btn-primary mr-1">Editer</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handelDelete(invoice.id)}>Supprimer</button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
        {itemsPerPage < filtredInvoices.length &&
        <Pagination 
        currentPage={currentPage} 
        itemsPerPage={itemsPerPage} 
        length={filtredInvoices.length} 
        onPageChanged={handlePageChange}
        />}
    </> 
    );
};
 
export default InvoicesPage;