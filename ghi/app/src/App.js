import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CreateSalespersonForm from './CreateSalespersonForm';
import SalespersonList from './SalespersonList';
import CustomerList from './CustomerList';
import CreateCustomerForm from './CreateCustomerForm';
import SalesList from './SalesList';
import CreateSaleForm from './CreateSaleForm';
import SalespersonHistoryList from './SalespersonHistoryList';
import TechnicianList from './TechnicianList';
import TechnicianForm from './TechnicianForm';
import AppointmentList from './AppointmentList';
import AppointmentForm from './AppointmentForm';

import ManufacturersList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';

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
          <Route path="technicians" element={<TechnicianList />} />
          <Route path="technicians/create" element={<TechnicianForm />} />
          <Route path="appointments" element={<AppointmentList />} />
          <Route path="appointments/create" element={<AppointmentForm />} />

          <Route path="manufacturers" element={<ManufacturersList />} />
          <Route path="manufacturers/create" element={<ManufacturerForm />} />
          <Route path="sales/" element={<SalesList />} />
          <Route path="sales/create/" element={<CreateSaleForm />} />
          <Route path="sales/history/" element={<SalespersonHistoryList />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
