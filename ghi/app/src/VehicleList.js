import { useState, useEffect } from 'react';

function VehicleList(){
    const [models, setmodels] = useState([])


    const getData = async () => {
        const response = await fetch('http://localhost:8100/api/models/');
        if (response.ok) {
            const { models } = await response.json();
            setmodels(models);
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
            <h1>Vehicles</h1>

            <table className="table table-striped m-3">
              <thead>
                <tr>
                  <th>Picture</th>
                  <th>Name</th>
                  <th>Manufacturer</th>
                </tr>
              </thead>
              <tbody>
                {models.map(model => (
                    <tr key={model.id}>
                      <td><img src={model.picture_url} alt="Vehicle" width="150"/></td>
                      <td>{ model.name }</td>
                      <td>{ model.manufacturer.name }</td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }


export default VehicleList;
