import React, { useEffect, useState } from "react";

function CreateSalespersonForm() {
    const [setSalesperson] = useState([])
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        employee_id: "",
    })

    const fetchData = async () => {
        const salespersonUrl = "http://localhost:8090/api/salespeople/";
        const response = await fetch(salespersonUrl);

        if (response.ok) {
            const data = await response.json();
            setSalesperson(data.salesperson);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const salespersonUrl = "http://localhost:8090/api/salespeople/";

        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(salespersonUrl, fetchConfig);
        if (response.ok) {
            setFormData({
                first_name: "",
                last_name: "",
                employee_id: "",
            });
        };
    }


    const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;

        setFormData({
            ...formData, [inputName]: value
        });
    }


    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="container">
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create A New Salesperson</h1>
                        <form onSubmit={handleSubmit} id="create-salesperson-form">

                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} value={formData.first_name} placeholder="First Name" required type="text" name="first_name" id="first_name" className="form-control" />
                                <label htmlFor="first_name">First Name</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} value={formData.last_name} placeholder="Last Name" required type="text" name="last_name" id="last_name" className="form-control" />
                                <label htmlFor="last_name">Last Name</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} value={formData.employee_id} placeholder="Employee Id" required type="text" name="employee_id" id="employee_id" className="form-control" />
                                <label htmlFor="employee_id">Employee Id</label>
                            </div>

                            <button className="btn btn-primary">Create</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default CreateSalespersonForm;
