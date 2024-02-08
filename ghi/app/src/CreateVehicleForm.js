import React, { useEffect, useState } from "react";

function CreateVehicleForm() {
    const [manufacturer, setManufacturer] = useState([])
    const [formData, setFormData] = useState({
        name: "",
        picture_url: "",
        manufacturer: "",
    })

    const fetchManufacturerData = async () => {
        const manufacturerUrl = "http://localhost:8100/api/manufacturers/";
        const response = await fetch(manufacturerUrl);
        if (response.ok) {
            const data = await response.json();
            setManufacturer(data.manufacturer);
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
            const vehicleUrl = "http://localhost:8100/api/models/";

            const fetchConfig = {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                },
            };

        const response = await fetch(vehicleUrl, fetchConfig);
        if (response.ok) {
            setFormData({
                name: "",
                picture_url: "",
                manufacturer: "",
            });
        };
    }
        catch(error)
        {console.log('error',error)}

    }

    useEffect(() => {
        fetchManufacturerData();
    }, []);

    console.log(formData)

    return (
        <div className="container">
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create A New Vehicle</h1>
                        <form onSubmit={handleSubmit} id="create-vehicle-form">

                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} value={formData.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} value={formData.picture_url} placeholder="Picture URL" required type="url" name="picture_url" id="picture_url" className="form-control" />
                                <label htmlFor="picture_url">Picture</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} value={formData.employee_id} placeholder="Employee Id" required type="text" name="employee_id" id="employee_id" className="form-control" />
                                <label htmlFor="employee_id">Employee Id</label>
                            </div>
                            <div className="mb-3">
                                <select onChange={handleFormChange} value={formData.manufacturer} required name="manufacturer" id="manufacturer" className="form-select">
                                    <option value="">Select Manufacturer</option>
                                    {manufacturer.map(manufacturer => {
                                        return (
                                            <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <button className="btn btn-primary">Create</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default CreateVehicleForm;
