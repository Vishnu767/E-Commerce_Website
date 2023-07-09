import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage(){
    return (
        <div className="vh-100 d-flex align-items-center justify-content-center">
            <Link className="btn btn-success m-2" to='/user-login'>User Login</Link>
            <Link className="btn btn-success m-2" to='/seller-login'>Seller Login</Link>
            <Link className="btn btn-success m-2" to='/admin-login'>Admin Login</Link>
        </div>
    )
}