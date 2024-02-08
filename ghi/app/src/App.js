import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CreateSalespersonForm from './CreateSalespersonForm';
import SalespersonList from './SalespersonList';
import CustomerList from './CustomerList';
import CreateCustomerForm from './CreateCustomerForm';
import SalesList from './SalesList';
import CreateSaleForm from './CreateSaleForm';


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
          <Route path="sales/" element={<SalesList />} />
          <Route path="sales/create/" element={<CreateSaleForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
