import React from "react";
import { Link } from "react-router-dom";
import SellerNavbar from "./SellerNavbar";

export default function SellersPage() {

  return (
    <div>
      <SellerNavbar />
      <div className="container-fluid">
        <Link to='/seller/create-item'>
          <button className="btn btn-primary d-block m-2">Create new Item</button>
        </Link>
        <Link to='/seller/dashboard'>
          <button className="btn btn-primary d-block m-2">Dashboard</button>
        </Link>
        <Link to='/seller/bank-accounts'>
          <button className="btn btn-primary d-block m-2">View Bank Accounts</button>
        </Link>
      </div>
    </div>
  );
}