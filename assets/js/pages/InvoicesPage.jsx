import React, { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';
import InvoicesAPI from '../services/invoicesAPI';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import TableLoader from '../components/loaders/TableLoader';
import Sort from '../services/sort';

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
    const [loading, setLoading] = useState(true);

    // Get Invoices //
    const fetchInvoices = async () => {
        try {
          const data = await InvoicesAPI.findAll()
          setInvoices(data);
          setLoading(false);
        } catch(error) {
            toast.error("Erruer lors du chargement des factures !");
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
           toast.success("La facture N° " + id + " à bien été supprimée !");
        } catch (error) {
            setInvoices(originalInvoices)
            toast.error("Une erreur est survenue");
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

    // Sorted invoices functions //
    const originalInvoices = invoices.slice(0);
    const order = (sortable) => {
        Sort.sortItems(originalInvoices, sortable);
        setInvoices(originalInvoices);
    }
    //////End of Sorted invoices functions///////

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
        <div className="mb-3 d-flex justify-content-between align-items-center">
            <h1>Liste des Factures !</h1>
            <Link to="/facture/new" className="btn btn-primary">Créer une facture</Link>
        </div>
        <div className="form-group">
        <input type="text" onChange={handleSearch} value={search} className="form-control" placeholder="Rechercher..."/>
      </div>
        <table className="table table-over">
            <thead>
                <tr>
                    <th><div className="clickable" onClick={() => order("chrono")}>Numéro</div></th>
                    <th><div className="">Client</div></th>
                    <th className="text-center"><div className="clickable" onClick={() => order("sentAt")}>Date d'envoi</div></th>
                    <th className="text-center"><div className="clickable" onClick={() => order("status")}>Statut</div></th>
                    <th className="text-center"><div className="clickable" onClick={() => order("amount")}>Montant</div></th>
                    <th className="text-center">Actions</th>
                </tr>
            </thead>
            {!loading && (
            <tbody>
            {paginatedInvoices.map(invoice => (
                  <tr key={invoice.id}>
                    <td>{invoice.chrono}</td>
                    <td>
                    <Link to={"/client/" + invoice.customer.id}>{invoice.customer.firstname} {invoice.customer.lastname}</Link>
                    </td>
                    <td className="text-center">{new Date(invoice.sentAt).toLocaleDateString()}</td>
                    <td className="text-center">
                        <span className={"badge badge-" + STATUS_CLASSES[invoice.status]}>
                        {STATUS_LABELS[invoice.status]}</span>
                    </td>
                    <td className="text-center">{invoice.amount.toLocaleString()} €</td>
                    <td className="text-center">
                      <Link to={"/facture/" + invoice.id} className="btn btn-sm btn-primary mr-1">Editer</Link>
                      <button className="btn btn-sm btn-danger" onClick={() => handelDelete(invoice.id)}>Supprimer</button>
                    </td>
                </tr>
                ))}
            </tbody>
            )}
        </table>
        {loading && <TableLoader />}
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