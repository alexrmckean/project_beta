import { useState, useEffect } from 'react';

function ServiceHistoryList(){
    const [appointments, setAppointments] = useState([])
    const [filterFirstValue, setFilterFirstValue] = useState('');


    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/appointments/');
        if (response.ok) {
            const { appointments } = await response.json();
            setAppointments(appointments);
        } else {
            console.error('An error occurred fetching the data');
        }
    };

    useEffect(() => {
        getData();
    }, []);


    function handleFilterFirstChange(e){
        setFilterFirstValue(e.target.value);
    }

    const filteredAppointments = appointments.filter(appointment =>
      appointment.vin.toLowerCase().includes(filterFirstValue.toLowerCase())
    );

    const inventoryVINs = ['VIN1', 'VIN2', 'VIN3'];

    const isVIPAppointment = (vin) => {
      return inventoryVINs.includes(vin);
    }

    return (
        <div className="my-5 container">
          <div className="row">
            <h1>Service History</h1>

            <input onChange={handleFilterFirstChange} type="text" placeholder="search by VIN" className="form-control mb-3"/>

            <table className="table table-striped m-3">
              <thead>
                <tr>
                  <th>VIN</th>
                  <th>Is VIP?</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Technician</th>
                  <th>Reason</th>
                  <th>Status </th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map(appointment => (
                    <tr key={appointment.id}>
                      <td>{ appointment.vin }</td>
                      <td>{isVIPAppointment(appointment.vin) ? 'Yes' : 'No'}</td>
                      <td>{ appointment.customer }</td>
                      <td>{new Date(appointment.date_time).toLocaleDateString()}</td>
                      <td>{new Date(appointment.date_time).toLocaleTimeString()}</td>
                      <td>{ appointment.technician }</td>
                      <td>{ appointment.reason }</td>
                      <td>{ appointment.status }</td>
                    </tr>

                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }


export default ServiceHistoryList;
