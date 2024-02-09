import React, { useEffect, useState } from "react";

function CreateVehicleForm() {
    const [manufacturers, setManufacturers] = useState([])
    const [formData, setFormData] = useState({
        name: "",
        picture_url: "",
        manufacturer: "",
    })

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/manufacturers/'
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = "http://localhost:8100/api/models/";

        const requestData = {
            ...formData,
            name: formData.name,
            picture_url: formData.picture_url,
            manufacturer_id: formData.manufacturer
         }

        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(requestData),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setFormData({
                name: "",
                picture_url: "",
                manufacturer: "",
            });
        };
    }

    const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;

        setFormData({
            ...formData,[inputName]: value
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
                            <div className="mb-3">
                                <select onChange={handleFormChange} value={formData.manufacturer} required name="manufacturer" id="manufacturer" className="form-select">
                                    <option value="">Select Manufacturer</option>
                                    {manufacturers.map(manufacturer => {
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
