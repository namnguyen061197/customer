import { Navigate, Route, Router, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
import Layout from "./components/layouts";
import Customer from "./pages/customer";
import CustomerDetail from "./pages/customerDetail";
import LayoutDetail from "./components/layoutDetails";
import OrderDetail from "./pages/orderDetail";
import EditCustomerDetail from "./pages/editCustomerDetail";
import Login from "./pages/login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SettingPage from "./pages/settingPage";
import NotFound from "./pages/notFound";

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="" element={<Layout />}>
            <Route path="/" element={<Navigate to="/customer" />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/customer/:id" element={<LayoutDetail />}>
              <Route path="detail" element={<CustomerDetail />} />
              <Route path="orders" element={<OrderDetail />} />
              <Route path="edit" element={<EditCustomerDetail />} />
            </Route>
            <Route path="/setting" element={<SettingPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
    </div>
  );
}

export default App;
