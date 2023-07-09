import React, {useState} from "react";
import axios from "axios";

export default function AdminLogin(){

    const [password, setPassword] = useState("");

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleLogin = async () => {
        await axios.post('http://localhost:5000/api/admin/verify-admin', {password: password})
            .then(res => {
                console.log(res.data);
                if(res.data.message === "Success"){
                    localStorage.setItem("admin", "true");
                    localStorage.setItem("id", res.data.id);
                    window.location.href = "/admin";
                }else{
                    window.alert("Wrong Password");
                    window.location.reload();
                }
            })
            .catch(err => {
                console.error(err);
            })
    }

    return (
        <div className="vh-100 d-flex align-items-center justify-content-center">
            <input className="p-1 m-2" placeholder="Enter Password" type="password" onChange={handlePasswordChange} />
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
        </div>
    )
}