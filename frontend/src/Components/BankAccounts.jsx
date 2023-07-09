import React, {useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function BankAccounts() {

    const [bankAccounts, setBankAccounts] = useState([]);

    const getBankAccounts = async () => {
        let allBankAccounts;
        const userId = localStorage.getItem("id");
        try {
            await axios.get(`http://localhost:5000/api/bank-account/${userId}`)
            .then(res => {
                allBankAccounts = res.data;
                setBankAccounts(allBankAccounts);
                console.log("Bank Accounts: ", res);
            }).catch(err => {
                console.error(err);
            })
        } catch (err) {
            console.error(err);
        }
    }

    const deleteBankAccount = async (accountNumber) => {
        try {
            await axios.delete(`http://localhost:5000/api/bank-account/${accountNumber}`)
            .then(res => {
                console.log(res);
                window.location.reload();
                alert("Bank Account Deleted Successfully");
            }).catch(err => {
                console.error(err);
            })
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="text-center">
            <h1>Bank Accounts</h1>
            <button className="btn btn-primary" onClick={getBankAccounts}>View all Bank Accounts</button>
            {bankAccounts.map((bankAccount) => (
                <div className=" m-3 border border-2">
                    <h3>{bankAccount.bankName}</h3>
                    <p>Account Number: {bankAccount.accountNumber}</p>
                    <p>Balance: Rs.{bankAccount.balance}</p>
                    <button className="btn btn-danger" onClick={() => deleteBankAccount(bankAccount.accountNumber)}>Delete</button>
                </div>
            ))}
            <Link to='/user/add-bank-account'>
                <button className="btn btn-success">Add Bank Account</button>
            </Link>
        </div>
    );
}
    