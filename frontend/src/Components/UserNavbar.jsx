import React, { useState, useEffect } from 'react';
import bell from "../Images/bell.svg";
import cart from "../Images/cart.svg";
import heart from "../Images/heart.svg";
import profile from "../Images/person-circle.svg";
import search_img from "../Images/search.svg"
import { Link } from 'react-router-dom';
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

export default function UserNavbar() {
    const [search, setSearch] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        //get auth state from firebase

        auth.onAuthStateChanged((user) => {
            if (user) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        })
    }, [loggedIn]);


    const logOut = async () => {
        try {
            await signOut(auth);
            localStorage.clear();
            window.location.href = "/";
        } catch (err) {
            console.error(err);
        }
    }

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log(search);
    };

    return (

        <div className="d-flex align-items-center justify-content-between bg-dark">

            <h3 className="text-light my-3 mx-2">GoShop</h3>
            
            <form className="form-inline my-2 my-lg-0 d-flex justify-content-center align-items-center" onSubmit={handleSearch}>
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={handleChange} />
                <button className="search-button m-0 border-0 bg-light d-flex align-items-center justify-content-center rounded" type="submit">
                    <img className="search-img" src={search_img} alt="search" />
                </button>
            </form>

            <div className="d-flex align-items-center justify-content-center mx-2">

                    <button className="notifications-button p-2 d-flex align-items-center rounded m-2 border-0 bg-light">
                        <img className="" src={bell} alt="bell" />
                    </button>

                    <button className="favourites-button p-2 d-flex align-items-center rounded m-2 border-0 bg-light">
                        <img className="" src={heart} alt="heart" />
                    </button>

                    <Link to="/user/cart">
                        <button className="cart-button p-2 d-flex align-items-center rounded m-2 border-0 bg-light">
                            <img className="" src={cart} alt="cart" />
                        </button>
                    </Link>

                    <Link to="/profile">
                        <button className="profile-button p-2 d-flex align-items-center rounded m-2 border-0 bg-light">
                            <img className="" src={profile} alt="profile" />
                        </button>
                    </Link>
                    <Link to="/user/orders">
                        <button className="btn btn-primary">Your Orders</button>
                    </Link>
                    <Link to="/user/bank-accounts">
                        <button className="btn btn-secondary m-2">Your Bank Accounts</button>
                    </Link>
                    <button className="btn btn-danger" id="logout" onClick={logOut}>Logout</button>

                </div>

        </div>

        
    )
}