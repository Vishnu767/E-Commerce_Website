import React from "react";
import {auth} from "../config/firebase";

export default function Profile(){
    
    return(
        <div>
            <h4>Name: {localStorage.getItem("name")}</h4>
            <h4>email: {localStorage.getItem("email")}</h4>
        </div>
    );
}