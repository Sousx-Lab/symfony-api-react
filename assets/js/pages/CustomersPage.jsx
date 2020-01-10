import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import CustomersAPI from "../services/customersAPI";


const CustomersPage = props => {

  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  // Get Customers //
  const fetchCustomers = async () => {
        try {
        const data = await CustomersAPI.findAll()
        setCustomers(data);
        } catch (error) {
          console.log(error.response)
        }
  }

  // On loading get Customers
  useEffect(() => {
    fetchCustomers();
  },[]);
// END function fetcheCustomers() //

// Delete Cutomers by Id //
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
      <h1>Liste des clients !</h1>
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
                <a href="#">{customer.firstname} {customer.lastname}</a>
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
