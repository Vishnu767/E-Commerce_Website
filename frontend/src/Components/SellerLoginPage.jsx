import React from "react";
import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import axios from 'axios';

export default function SellerLoginPage() {

    const logOut = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    }

    const signInWithGoogle = async () => {
        try{
            await signInWithPopup(auth, googleProvider);
            const email = auth?.currentUser?.email;
            const name = auth?.currentUser?.displayName;
            axios.get(`http://localhost:5000/api/sellers/search/${email}`)
            .then(res => {
                // console.log("Result: ", res);
                
                if(res.data.length === 0){
                    axios.post("http://localhost:5000/api/sellers", {
                        name: name,
                        email: email
                        }).then(res => {
                            console.log("User created: ", res);
                            console.log("Name: ", res.data.seller.name);
                            console.log("Email: ", res.data.seller.email);
                            localStorage.clear();
                            localStorage.setItem("name", res.data.seller.name);
                            localStorage.setItem("email", res.data.seller.email);
                            localStorage.setItem("id", res.data.seller._id);
                        }).catch(err => {
                            console.error(err);
                        })
                    window.location.href = "/seller";
                    console.log("Seller not found");
                }else{
                    console.log("User found: ", res.data);
                    localStorage.clear();
                    localStorage.setItem("name", res.data[0].name);
                    localStorage.setItem("email", res.data[0].email);
                    localStorage.setItem("id", res.data[0]._id);
                    window.location.href = "/seller";
                }
            }).catch(err => {
                console.log(err);
            })
            // redirect back to home page
            
        } catch (err){
            console.error(err);
        }

    }
    return (
        <div>
            <button onClick={signInWithGoogle}>Sign In with Google</button>
        </div>
    )
}