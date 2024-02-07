import React, {useEffect, useState} from 'react';

function TechnicianForm() {
  const [technicians, setTechnicians] = useState([])

  const [formData, setFormData] = useState({
    employee_id: '',
    first_name: '',
    last_name: '',
  })

  const fetchData = async () => {
    const technicianUrl = "http://localhost:8080/api/technicians/";
    const response = await fetch(technicianUrl);

    if (response.ok) {
      const data = await response.json();
      setTechnicians(data.technician);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const technicianUrl = "http://localhost:8080/api/technicians/";

    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(technicianUrl, fetchConfig);
    if (response.ok){
      setFormData({
        first_name: '',
        last_name: '',
        employee_id: '',
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
                    <h1>Create A Technician</h1>
                    <form onSubmit={handleSubmit} id="create-technician-form">

                        <div className="form-floating mb-3">
                            <input onChange={handleFormChange} value={formData.first_name} placeholder="First Name" required type="text" name="first_name" id="first_name" className="form-control" autoComplete='off' />
                            <label htmlFor="first_name">First Name</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input onChange={handleFormChange} value={formData.last_name} placeholder="Last Name" required type="text" name="last_name" id="last_name" className="form-control" autoComplete='off'/>
                            <label htmlFor="last_name">Last Name</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input onChange={handleFormChange} value={formData.employee_id} placeholder="Employee Id" required type="text" name="employee_id" id="employee_id" className="form-control" autoComplete='off'/>
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

export default TechnicianForm
