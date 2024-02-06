import { useState, useEffect } from "react";


function CustomerList(){
    const [customer, setCustomer] = useState([]);

    const getData = async () => {
        const response = await fetch("http://localhost:8090/api/customers/")
        if (response.ok) {
            const { customer } = await response.json();
            setCustomer(customer);
        } else {
            console.error("Error occured while fetching customer data")
        }
    }

    const handleDelete = async (e) => {
        const id = e.target.dataset.id

        const fetchOptions = { method: "DELETE"}
        const request = await fetch(`http://localhost:8090/api/customers/${id}/`, fetchOptions)
        if (request.ok) {
            getData()
        }
    }

    useEffect(()=>{
        getData()
    }, []);

    return (
    <>
        <div className="my-5 container">
            <h1>List of Customers</h1>
        </div>
        <table className="table table-striped">
            <thead className="thead-dark">
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Address</th>
                    <th>Phone Number</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {customer.map(customer => (
                    <tr key={customer.id}>
                        <td>{customer.first_name}</td>
                        <td>{customer.last_name}</td>
                        <td>{customer.address}</td>
                        <td>{customer.phone_number}</td>
                        <td><button data-id={customer.id} onClick={handleDelete} className="btn btn-danger">Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
    );
}

export default CustomerList;
