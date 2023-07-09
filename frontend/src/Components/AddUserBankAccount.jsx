import React, { useState } from "react";
import axios from "axios";

export default function AddUserBankAccount() {

    const [bankName, setBankName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");

    const handleBankNameChange = (e) => {
        setBankName(e.target.value);
    }

    const handleAccountNumberChange = (e) => {
        setAccountNumber(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post('http://localhost:5000/api/bank-account', {
            bankName: bankName,
            userId: localStorage.getItem("id"),
            accountNumber: accountNumber
        })
            .then(res => {
                console.log(res.data);
                alert("Bank Account Added Successfully");
            })
            .catch(err => {
                console.error(err);
            })
    }

    return (
        <div className="container p-5 text-center" onSubmit={handleSubmit}>
            <h1>Add Bank Account</h1>
            <form className="">
                <select className="col-4 p-2" onChange={handleBankNameChange} required>
                    <option selected>Select</option>
                    <option>ICICI Bank</option>
                    <option>SBI</option>
                    <option>Axis Bank</option>
                    <option>Union Bank</option>
                    <option>Bank of India</option>
                </select>
                <input className="p-1" type="text" placeholder="Enter Account Number" onChange={handleAccountNumberChange} required />
                <button className="btn btn-success" type="submit">Submit</button>
            </form>
        </div>
    );
}