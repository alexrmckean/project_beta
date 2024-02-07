import { useState, useEffect } from 'react';

function TechnicianList(){
    const [technicians, setTechnicians] = useState([])


    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/technicians/');
        if (response.ok) {
            const { technician } = await response.json();
            setTechnicians(technician);
            console.log(technician)
        } else {
            console.error('An error occurred fetching the data');
        }
    };

    useEffect(() => {
        getData();
    }, []);


    return (
        <div className="my-5 container">
          <div className="row">
            <h1>Technicians</h1>

            <table className="table table-striped m-3">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                </tr>
              </thead>
              <tbody>
                {technicians.map(technician => (
                    <tr key={technician.id}>
                      <td>{ technician.employee_id }</td>
                      <td>{ technician.first_name }</td>
                      <td>{ technician.last_name }</td>
                    </tr>

                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }


export default TechnicianList;
