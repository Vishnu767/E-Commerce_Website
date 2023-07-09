import React from "react";
import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import axios from 'axios';

export default function UserLoginPage() {

    const signInWithGoogle = async () => {
        try{
            await signInWithPopup(auth, googleProvider);
            const email = auth?.currentUser?.email;
            const name = auth?.currentUser?.displayName;
            axios.get(`http://localhost:5000/api/users/search/${email}`)
            .then(res => {
                // console.log("Result: ", res);
                
                if(res.data.length === 0){
                    axios.post("http://localhost:5000/api/users", {
                        name: name,
                        email: email
                        }).then(res => {
                            console.log("User created: ", res);
                            localStorage.clear();
                            localStorage.setItem("name", res.data.user.name);
                            localStorage.setItem("email", res.data.user.email);
                            localStorage.setItem("id", res.data.user._id);
                            // Redirect to '/user' page
                        }).catch(err => {
                            console.error(err);
                        })
                    window.location.href = "/user";
                    console.log("User not found");
                }else{
                    console.log("User found: ", res.data);
                    localStorage.clear();
                    localStorage.setItem("name", res.data[0].name);
                    localStorage.setItem("email", res.data[0].email);
                    localStorage.setItem("id", res.data[0]._id);
                    window.location.href = "/user"; 
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