import { useState, useEffect } from "react";


function SalespersonList(){
    const [salesperson, setSalesperson] = useState([]);
    const getData = async () => {
        const response = await fetch("http://localhost:8090/api/salespeople/")
        if (response.ok) {
            const { salesperson } = await response.json();
            setSalesperson(salesperson);
        } else {
            console.error("Error occured while fetching salesperson data")
        }
    }

    const handleDelete = async (e) => {
        const id = e.target.dataset.id

        const fetchOptions = { method: "DELETE"}
        const request = await fetch(`http://localhost:8090/api/salespeople/${id}/`, fetchOptions)
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
            <h1>List Of Salespeople</h1>
        </div>
        <table className="table table-striped">
            <thead className="thead-dark">
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Employee Id</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {salesperson.map(salesperson => (
                    <tr key={salesperson.id}>
                        <td>{salesperson.first_name}</td>
                        <td>{salesperson.last_name}</td>
                        <td>{salesperson.employee_id}</td>
                        <td><button data-id={salesperson.id} onClick={handleDelete} className="btn btn-danger">Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
    );
}

export default SalespersonList;
