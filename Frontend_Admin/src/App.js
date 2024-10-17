import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import { Path } from './Commen/Path';
import ProductList from './Screens/Product/ProductList';
import AddProduct from './Screens/Product/AddProduct';
import UpdateProduct from './Screens/Product/UpdateProduct';
import UserList from './Screens/User/UserList';
import Login from './Screens/Login/Login';
import { useEffect, useState } from 'react';
import Constents from './Commen/constents';
import OrderList from './Screens/Order/OrderList';
import CategoryList from './Screens/Category/CategoryList';
import OrderDetails from './Screens/Order/OrderDetails';
import YourOrders from './Screens/Order/YourOrder';
import Dashboard from './Screens/Dashboard/Dashboard';
import apiHelper from './Commen/ApiHelper';
import StockList from './Screens/Stock/StokList';
import { useSnackbar } from 'notistack';


function App() {
  const {enqueueSnackbar} =useSnackbar()
  const [Auth, setAuth] = useState(Constents.getUserDetails())
  
  useEffect(() => {
    window["showSnack"] = enqueueSnackbar
    apiHelper.setAuth =setAuth
    // eslint-disable-next-line
  }, [])  

  return (
    <BrowserRouter>
      <div className="App">

        <Routes>
          <Route path={Path.product} element={<Layout Auth={Auth} setAuth={setAuth} Component={<ProductList Auth={Auth} />} />} />
          <Route path={Path.addProduct} element={<Layout Auth={Auth} setAuth={setAuth} Component={<AddProduct Auth={Auth} />} />} />
          <Route path={Path.updateProduct} element={<Layout Auth={Auth} setAuth={setAuth} Component={<UpdateProduct Auth={Auth} />} />} />
          <Route path={Path.orderlist} element={<Layout Auth={Auth} setAuth={setAuth} Component={<OrderList Auth={Auth} />} />} />
          <Route path={Path.user} element={<Layout Auth={Auth} setAuth={setAuth} Component={<UserList Auth={Auth} />} />} />
          <Route path={Path.category} element={<Layout Auth={Auth} setAuth={setAuth} Component={<CategoryList Auth={Auth} />} />} />
          <Route path={Path.orderdetails} element={<Layout Auth={Auth} setAuth={setAuth} Component={<OrderDetails Auth={Auth} />} />} />
          <Route path={Path.yourOrders} element={<Layout Auth={Auth} setAuth={setAuth} Component={<YourOrders Auth={Auth} />} />} />
          <Route path={Path.dashboard} element={<Layout Auth={Auth} setAuth={setAuth} Component={<Dashboard Auth={Auth} />} />} />
          <Route path={Path.stock} element={<Layout Auth={Auth} setAuth={setAuth} Component={<StockList Auth={Auth} />} />} />
          <Route path={Path.login} element={<Login Auth={Auth} setAuth={setAuth} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App