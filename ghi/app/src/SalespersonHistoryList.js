import { useState, useEffect } from "react";


function SalespersonHistoryList(){
    const [sales, setSales] = useState([]);
    const [filterValue, setFilterValue] = useState('');


    const getData = async () => {
        const response = await fetch("http://localhost:8090/api/sales/");
        if (response.ok) {
            const data  = await response.json();
            setSales(
                data.sale.map((sale) => {
                    return {
                      salesperson: sale.salesperson,
                      customer: sale.customer,
                      automobile: sale.automobile,
                      price: sale.price,
                    };
                })
            );
        } else {
            console.error("Error occured while fetching sale data")
        }

    }


    function handleFilterChange(e){
        setFilterValue(e.target.value);
    }

    const filteredSale = sales.filter(sale =>
        sale.salesperson.first_name.toLowerCase().includes(filterValue.toLowerCase())

    );

    useEffect(() => {
        getData();
    }, []);

    return (
    <>
        <div className="my-5 container">
            <h1>Salesperson History</h1>
            <input onChange={handleFilterChange} type="text" placeholder="search" className="form-control mb-3"/>
        </div>
        <table className="table table-striped">
            <thead className="thead-dark">
                <tr>
                    <th>Salesperson</th>
                    <th>Customer</th>
                    <th>Automobile VIN</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {filteredSale.map(sale => {
                    return(
                        <tr key={sale.id}>
                            <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                            <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                            <td>{sale.automobile.vin}</td>
                            <td>{sale.price}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </>
    );
}

export default SalespersonHistoryList;
