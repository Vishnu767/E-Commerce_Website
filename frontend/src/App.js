import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import 'bootstrap/dist/js/bootstrap.bundle.min';
import HomePage from './Components/HomePage';
import Profile from './Components/Profile';
import SellerLoginPage from './Components/SellerLoginPage';
import UserLoginPage from './Components/UserLoginPage';
import SellersPage from './Components/SellersPage';
import UsersPage from './Components/UsersPage';
import SellerCreateItem from './Components/SellerCreateItem';
import SellerDashboard from './Components/SellerDashboard';
import Cart from './Components/Cart';
import BankAccounts from './Components/BankAccounts';
import AddUserBankAccount from './Components/AddUserBankAccount';
import Payment from './Components/Payment';
import Orders from './Components/Orders';
import AdminLogin from './Components/AdminLogin';
import AdminPage from './Components/AdminPage';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={
          <>
            <HomePage />

          </>
        } />

        <Route path="/profile" element={
          <>
            <Profile />

          </>
        } />

        <Route path="/user-login" element={
          <>
            <UserLoginPage />

          </>
        } />

        <Route path="/seller-login" element={
          <>
            <SellerLoginPage />

          </>
        } />

        <Route path="/seller" element={
          <>
            <SellersPage />

          </>
        } />

        <Route path="/user" element={
          <>
            <UsersPage />

          </>
        } />

        <Route path="/seller/create-item" element={
          <>
            <SellerCreateItem />

          </>
        } />

        <Route path="/seller/dashboard" element={
          <>
            <SellerDashboard />

          </>
        } />

        <Route path="/user/cart" element={
          <>
            <Cart />

          </>
        } />

        <Route path="/user/bank-accounts" element={
          <>
            <BankAccounts />

          </>
        } />

        <Route path="/user/add-bank-account" element={
          <>
            <AddUserBankAccount />

          </>
        } />

        <Route path="/user/payment" element={
          <>
            <Payment />

          </>
        } />

        <Route path="/seller/bank-accounts" element={
          <>
            <BankAccounts />

          </>
        } />

        <Route path="/user/orders" element={
          <>
            <Orders />

          </>
        } />

        <Route path="/admin-login" element={
          <>
            <AdminLogin />

          </>
        } />

        <Route path="/admin" element={
          <>
            <AdminPage />

          </>
        } />

      </Routes>
    </Router>
  );
}

export default App;
