import { useState, useEffect } from "react";


function SalespersonHistoryList(){
    const [sale, setSales] = useState([]);
    const [salespersonHistory, setSalespersonHistory] = useState([]);
    const [filterValue, setFilterValue] = useState("");

    const getData = async () => {
        const response = await fetch("http://localhost:8090/api/sales/")
        if (response.ok) {
            const { sale } = await response.json();

            setSales(
                sale.results.map((sale) => {
                    return {
                      salesperson: sale.salesperson.first_name,
                      customer: sale.customer.first_name,
                      automobile: sale.automobile.vin,
                      price: sale.price,
                    };
                  })
            );
        } else {
            console.error("Error occured while fetching salesperson history data")
        }
    }


    useEffect(()=>{
        getData()
    }, []);

    function handleFilterChange(e) {
        setFilterValue(e.target.value);
    }

    const filteredSale = sale.filter((sale) =>
        filteredSale.includes(filterValue)
    );

    return (
    <>
        <div className="my-5 container">
            <h1>Salesperson History</h1>
            <input
            onChange={handleFilterChange}
            placeholder="search"
            />
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
                {filteredSale.map((sale) => {
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
