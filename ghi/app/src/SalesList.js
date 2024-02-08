import { useState, useEffect } from "react";


function SalesList(){
    const [sale, setSales] = useState([]);
    const getData = async () => {
        const response = await fetch("http://localhost:8090/api/sales/")
        if (response.ok) {
            const { sale } = await response.json();
            setSales(sale);
        } else {
            console.error("Error occured while fetching sale data")
        }
    }

    const handleDelete = async (e) => {
        const id = e.target.dataset.id

        const fetchOptions = { method: "DELETE"}
        const request = await fetch(`http://localhost:8090/api/sales/${id}/`, fetchOptions)
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
            <h1>List Of Sales</h1>
        </div>
        <table className="table table-striped">
            <thead className="thead-dark">
                <tr>
                    <th>Salesperson</th>
                    <th>Employee Id</th>
                    <th>Automobile VIN</th>
                    <th>Customer</th>
                    <th>Price</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {sale.map(sale => {
                    return(
                        <tr key={sale.id}>
                            <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                            <td>{sale.salesperson.employee_id}</td>
                            <td>{sale.automobile.vin}</td>
                            <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                            <td>{sale.price}</td>
                            <td><button data-id={sale.id} onClick={handleDelete} className="btn btn-danger">Delete</button></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </>
    );
}

export default SalesList;
