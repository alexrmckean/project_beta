import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CreateSalespersonForm from './CreateSalespersonForm';
import SalespersonList from './SalespersonList';
import CustomerList from './CustomerList';
import CreateCustomerForm from './CreateCustomerForm';


import AppointmentForm from './AppointmentForm';
import AutomobileList from './AutomobileList';
import AutomobileForm from './AutomobileForm';
import ServiceHistoryList from './ServiceHistory';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="customer/" element={<CustomerList />} />
          <Route path="customer/create/" element={<CreateCustomerForm />} />
          <Route path="salesperson/" element={<SalespersonList />} />
          <Route path="salesperson/create/" element={<CreateSalespersonForm />} />




          <Route path="appointments/create" element={<AppointmentForm />} />

          <Route path="automobiles" element={<AutomobileList />} />
          <Route path="automobiles/create" element={<AutomobileForm />} />
          <Route path="appointments/history" element={<ServiceHistoryList />} />



        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
