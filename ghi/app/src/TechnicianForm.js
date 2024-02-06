import React, {useEffect, useState} from 'react';

function TechnicianForm() {

    const [employee_id, setEmployee_ID] = useState('');
    const [first_name, setFirst_Name] = useState('');
    const [last_name, setLast_Name] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.employee_id = employee_id;
        data.first_name = first_name;
        data.last_name = last_name;

        const technicianUrl = 'http://localhost:8080/api/technicians/';
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(technicianUrl, fetchConfig);
        if (response.ok) {
            const newTechnician = await response.json();
            console.log(newTechnician);

            setEmployee_ID('');
            setFirst_Name('');
            setLast_Name('');
        }
    }

    const handleChangeEmployee_ID = (event) => {
        const value = event.target.value;
        setEmployee_ID(value);
    }

    const handleChangeFirst_Name = (event) => {
        const value = event.target.value;
        setFirst_Name(value);
    }

    const handleChangeLast_Name = (event) => {
        const value = event.target.value;
        setLast_Name(value);
    }

    return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Add a technician</h1>
              <form onSubmit={handleSubmit} id="create-technician-form">
                <div className="form-floating mb-3">
                  <input value={first_name} onChange={handleChangeFirst_Name} placeholder="First Name" required type="text" name="first_name" id="first_name" className="form-control" />
                  <label htmlFor="first_name">First Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input value={last_name} onChange={handleChangeLast_Name} placeholder="Last Name" required type="text" name="last_name" id="last_name" className="form-control" />
                  <label htmlFor="last_name">Last Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input value={employee_id} onChange={handleChangeEmployee_ID} placeholder="Employee ID" required type="text" name="employee_id" id="employee_id" className="form-control" />
                  <label htmlFor="employee_id">Employee IDr</label>
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      );
}
export default TechnicianForm
