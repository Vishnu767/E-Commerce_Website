import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import profile from "../Images/person-circle.svg"

export default function SellerNavbar() {

    const logOut = async () => {
        try {
            await signOut(auth);
            localStorage.clear();
            window.location.href = "/";
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="bg-dark d-flex align-items-center justify-content-between p-2 text-light">
            <h3>GoShop</h3>
            <Link to="/profile">
                        <button className="profile-button p-2 d-flex align-items-center rounded m-2 border-0 bg-light">
                            <img className="" src={profile} alt="profile" />
                        </button>
                    </Link>
            <button className="btn btn-danger" onClick={logOut}>Logout</button>
        </div>
    );
}