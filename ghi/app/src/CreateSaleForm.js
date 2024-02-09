import React, { useEffect, useState } from "react";

function CreateSaleForm() {
    const [customer, setCustomer] = useState([])
    const [salesperson, setSalesperson] = useState([])
    const [autos, setAutomobile] = useState([])
    const [formData, setFormData] = useState({
        automobile: "",
        salesperson: "",
        customer: "",
        price: "",
    })

    const fetchAutomobileData = async () => {
        const automobileUrl = "http://localhost:8100/api/automobiles/";
        const response = await fetch(automobileUrl);
        if (response.ok) {
            const data = await response.json();
            setAutomobile(data.autos);
        }
    }

    const fetchCustomerData = async () => {
        const customerUrl = "http://localhost:8090/api/customers/";
        const response = await fetch(customerUrl);

        if (response.ok) {
            const data = await response.json();
            setCustomer(data.customer);
        }
    }

    const fetchSalespersonData = async () => {
        const salespersonUrl = "http://localhost:8090/api/salespeople/";
        const response = await fetch(salespersonUrl);

        if (response.ok) {
            const data = await response.json();
            setSalesperson(data.salesperson);
        }
    }

    const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;

        setFormData({
            ...formData, [inputName]: value
    });

}
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const saleUrl = "http://localhost:8090/api/sales/";

            const fetchConfig = {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                },
            };

        const response = await fetch(saleUrl, fetchConfig);
        if (response.ok) {
            setFormData({
                automobile: "",
                salesperson: "",
                customer: "",
                price: "",
            });
        };

    }
        catch(error)
        {console.log('error',error)}
}


    useEffect(() => {
        fetchCustomerData();
        fetchSalespersonData();
        fetchAutomobileData();
    }, []);


    return (
        <div className="container">
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create A New Sale</h1>
                        <form onSubmit={handleSubmit} id="create-sale-form">
                            <div className="mb-3">
                                <select onChange={handleFormChange} value={formData.autos} required name="automobile" id="automobile" className="form-select">
                                    <option value="">Select Automobile VIN</option>
                                    {autos.map(autos => {
                                        return (
                                            <option key={autos.vin} value={autos.vin}>{autos.vin}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="mb-3">
                                <select onChange={handleFormChange} value={formData.salesperson} required name="salesperson" id="salesperson" className="form-select">
                                    <option value="">Select A Salesperson</option>
                                    {salesperson.map(salesperson => {
                                        return (
                                            <option key={salesperson.id} value={salesperson.id}>{salesperson.first_name} {salesperson.last_name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="mb-3">
                                <select onChange={handleFormChange} value={formData.customer} required name="customer" id="customer" className="form-select">
                                    <option value="">Select A Customer</option>
                                    {customer.map(customer => {
                                        return (
                                            <option key={customer.id} value={customer.id}>{customer.first_name} {customer.last_name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} value={formData.price} placeholder="Price" required type="text" name="price" id="price" className="form-control" />
                                <label htmlFor="price">Price</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default CreateSaleForm;
