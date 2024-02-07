import { useState, useEffect } from 'react';

function AppointmentList(){
    const [appointments, setAppointments] = useState([])


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


    return (
        <div className="my-5 container">
          <div className="row">
            <h1>Service Appointments</h1>

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
                {appointments.map(appointment => (
                    <tr key={appointment.id}>
                      <td>{ appointment.vin }</td>
                      <td>No</td>
                      <td>{ appointment.customer }</td>
                      <td>{ appointment.date_time }</td>
                      <td> </td>
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


export default AppointmentList;
