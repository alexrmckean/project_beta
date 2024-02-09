import { useState, useEffect } from 'react';

function AppointmentList(){
    const [appointments, setAppointments] = useState([])
    const [automobilesVins, setAutomobileVins] = useState([]);


    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/appointments/');
        if (response.ok) {
            const { appointments } = await response.json();
            setAppointments(appointments);
        } else {
            console.error('An error occurred fetching the data');
        }

        const automobileResponse = await fetch('http://localhost:8100/api/automobiles/')
        if (automobileResponse.ok) {
          const { autos } = await automobileResponse.json();
          const vins = autos.map(auto => auto.vin);
          setAutomobileVins(vins);
        } else {
          console.error('An error occured fetching the automobile data');
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const cancelAppointment = async (id) => {
      try {
        const response = await fetch(`http://localhost:8080/api/appointments/${id}/cancel/`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, status: "cancel" })

        });
        if(response.ok) {
          setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== id));
        } else {
          console.error("Failed to cancel appointment");
        }

      } catch (error) {
        console.error("Error canceling appointment:: ", error);
      }
    };

    const finishAppointment = async (id) => {
      try {
        const response = await fetch(`http://localhost:8080/api/appointments/${id}/finish/`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, status:"finish" })
        });
        if(response.ok) {
          setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== id));
        } else {
          console.error("Failed to finish appointment");
        }

      } catch (error) {
        console.error("Error finishing appointment:: ", error);
      }
    };

    const isVIPAppointment = (vin) => {
      return automobilesVins.includes(vin);
    }


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
                {appointments
                .filter(appointment=> appointment.status === "pending")
                .map(appointment => (
                    <tr key={appointment.id}>
                      <td>{ appointment.vin }</td>
                      <td>{isVIPAppointment(appointment.vin) ? 'Yes' : 'No'}</td>
                      <td>{ appointment.customer }</td>
                      <td>{new Date(appointment.date_time).toLocaleDateString()}</td>
                      <td>{new Date(appointment.date_time).toLocaleTimeString()}</td>
                      <td>{ appointment.technician }</td>
                      <td>{ appointment.reason }</td>
                      <td>
                        <button onClick={() => cancelAppointment(appointment.id)}>Cancel</button>
                        <button onClick={() => finishAppointment(appointment.id)}>Finish</button>
                      </td>
                    </tr>

                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }


export default AppointmentList;
