import React, {useState} from "react";
import axios from "axios";

const BankAccountComponent = (props) => {

    const handlePayment = async () => {
        if(props.data.balance >= localStorage.getItem("amount")){
            await axios.post("http://localhost:5000/api/transactions/", {
                userAccountNumber: props.data.accountNumber,
                userId: localStorage.getItem("id"),
                amount: localStorage.getItem("amount")
            }).then(res => {
                console.log(res);
                window.alert("Payment Successful");
            }).catch(err => {
                window.alert("Couldn't place order! If your money is debited, it will be refunded within 3-4 working days.")
                console.error(err);
            })
            window.location.href = "/user"; 
        }else{
            window.alert("Insufficient Balance");
        }
    }

    return (
        <div className="m-3 border border-2 p-2">
            <h3>{props.data.bankName}</h3>
            <p>Account Number: {props.data.accountNumber}</p>
            <p>Balance: Rs.{props.data.balance}</p>
            <button className="btn btn-success" onClick={handlePayment}>Pay {localStorage.getItem("amount")}</button>
        </div>
    )
}

export default function Payment() {

    const [bankAccounts, setBankAccounts] = useState([]);

    const getAllBankAccounts = async () => {
        try {
            await axios.get(`http://localhost:5000/api/bank-account/${localStorage.getItem("id")}`)
            .then(res => {
                setBankAccounts(res.data);
                console.log(res);
            }).catch(err => {
                console.error(err);
            })
        } catch (err) {
            console.error(err);
        }
    }

    function getBankAccounts(){
        console.log(bankAccounts);
        return bankAccounts.map((bankAccount) => {
            return <BankAccountComponent data={bankAccount} />
        })
    }

    return (
        <div>
            <h2 className="text-center m-3">Payment Interface</h2>
            <div className="d-flex align-items-center justify-content-center">
                <button className="btn btn-primary" onClick={() => getAllBankAccounts()}>Choose your Bank Account</button>
            </div>
            {getBankAccounts()}
        </div>
    );
}