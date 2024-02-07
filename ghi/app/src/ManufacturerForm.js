import React, {useEffect, useState} from 'react';

function ManufacturerForm() {
  const [manufacturers, setManufacturers] = useState([])

  const [formData, setFormData] = useState({
    name: '',
  })

  const fetchData = async () => {
    const manufacturerUrl = "http://localhost:8100/api/manufacturers/";
    const response = await fetch(manufacturerUrl);

    if (response.ok) {
      const data = await response.json();
      setManufacturers(data.manufacturers);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const manufacturerUrl = "http://localhost:8100/api/manufacturers/";

    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(manufacturerUrl, fetchConfig);
    if (response.ok){
      setFormData({
        name: '',
      });
    };
  }

  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;

    setFormData({
      ...formData,
      [inputName]: value
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
                    <h1>Create A Manufacturer</h1>
                    <form onSubmit={handleSubmit} id="create-manufacturer-form">

                        <div className="form-floating mb-3">
                            <input onChange={handleFormChange} value={formData.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" autoComplete='off' />
                            <label htmlFor="name">Manufacturer Name</label>
                        </div>

                        <button className="btn btn-primary">Create</button>

                    </form>
                </div>
            </div>
        </div>
    </div>
);
}

export default ManufacturerForm;
