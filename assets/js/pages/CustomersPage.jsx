import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import CustomersAPI from "../services/customersAPI";
import { Link } from "react-router-dom";


const CustomersPage = props => {

  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  //Récupération des customers
  const fetchCustomers = async () => {
        try {
        const data = await CustomersAPI.findAll()
        setCustomers(data);
        } catch (error) {
          console.log(error.response)
        }
  }

  // On loading recupére les customers
  useEffect(() => {
    fetchCustomers();
  },[]);
// END function fetcheCustomers() //

// Suppression des Cutomers par Id //
  const handleDelete = async id => {
    const originalCustomers = [...customers];
    setCustomers(customers.filter(customer => customer.id !== id));
    try {
      await CustomersAPI.delete(id)
    } catch (error) {
      setCustomers(originalCustomers);
      console.log(error.response);
    }
  };
// END function handleDelete() //

// Search Manager //
  const handleSearch = ({ currentTarget }) => {
    setSearch(currentTarget.value);
    setCurrentPage(1);
  }

  

  // Search filter //
  const filtredCustomers = customers.filter(
        c => c.firstname.toLowerCase().includes(search.toLowerCase()) || 
        c.lastname.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        (c.company && c.company.toLowerCase().includes(search.toLowerCase()))
  );

  // Pagination //
  // Page changer //
  const handelePageChange = page => setCurrentPage(page);

  const itemsPerPage = 10;
  const paginatedCustomers = Pagination.getData(
      filtredCustomers,
      currentPage,
      itemsPerPage
  );
  // END function//
  return (
    <>
    <div className="mb-3 d-flex justify-content-between align-items-center">
        <h1>Liste des clients !</h1>
      <Link to="/client/new" className="btn btn-primary">Créer un client</Link>
    </div>
      <div className="form-group">
        <input type="text" onChange={handleSearch} value={search} className="form-control" placeholder="Rechercher..."/>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>id.</th>
            <th>Client</th>
            <th>Email</th>
            <th>Entreprise</th>
            <th className="text-center">Factures</th>
            <th className="text-center">Montant total</th>
            <th></th>
          </tr>
         </thead>
        <tbody>
          {paginatedCustomers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>
                <Link to={"/client/" + customer.id}>{customer.firstname} {customer.lastname}</Link>
              </td>
              <td>{customer.email}</td>
              <td>{customer.company}</td>
              <td className="text-center">
                <span className="badge badge-primary">{customer.invoices.length}</span>
              </td>
              <td className="text-center">{customer.totalAmount.toLocaleString()} €</td>
              <td>
                <button onClick={() => handleDelete(customer.id)}
                  disabled={customer.invoices.length > 0} className="btn btn-sm btn-danger">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {itemsPerPage < filtredCustomers.length && 
      <Pagination 
      currentPage={currentPage}
      itemsPerPage={itemsPerPage}
      length={filtredCustomers.length}
      onPageChanged={handelePageChange}
      />} 
    </>
  );
};

export default CustomersPage;
