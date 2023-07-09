import React, {useState} from 'react';
import axios from 'axios';

export default function AdminPage() {
    
    const [clicked, setClicked] = useState(0);
    const [warehouseName, setWarehouseName] = useState("");
    const [warehouseLocation, setWarehouseLocation] = useState("");

    const handleWarehouseNameChange = (e) => {
        setWarehouseName(e.target.value);
    }

    const handleWarehouseLocationChange = (e) => {
        setWarehouseLocation(e.target.value);
    }

    const AddWarehouse = async () => {
        const warehouse = {
            name: warehouseName,
            location: warehouseLocation
        }
        await axios.post('http://localhost:5000/api/warehouses', warehouse)
            .then(res => {
                console.log(res.data);
                window.alert("Warehouse Added");
                window.location.reload();
            })
            .catch(err => {
                console.error(err);
            })
    }

    const getBankBalance = async () => {
        let bankBalance = 0;
        await axios.get(`http://localhost:5000/api/bank-account/${localStorage.getItem("id")}`)
                .then(res => {
                    console.log(res.data);
                    bankBalance = res.data[0].balance;
                    window.alert(`Bank Balance: ${bankBalance}`);
                })
                .catch(err => {
                    console.error(err);
                })
        return bankBalance;
    }

    function handleClick(){
        if(clicked === 1){
            return (
                <div className="my-5 container">
                    <input className="p-1 m-2 col-5" placeholder="Enter Warehouse Name" type="text" onChange={handleWarehouseNameChange} required />
                    <input className="p-1 m-2 col-5" placeholder="Enter Warehouse location" type="text" onChange={handleWarehouseLocationChange} required />
                    <button className="btn btn-success m-2 col-3" onClick={AddWarehouse}>Add Warehouse</button>
                </div>
            )
        }else if(clicked === 2){
            return (
                <div className="my-5 container">
                    <button className="btn btn-success" onClick={getBankBalance}>View Bank Balance</button>
                </div>
            )
        }   
    }

    function checkClick(cur){
        if(clicked === cur){
            setClicked(0);
        }else{
            setClicked(cur);
        }
    }

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/";
    }

    return (
        <div>
            {localStorage.getItem("admin") === "true" ? (
                <div className="vh-100 text-center">
                    <div className="d-flex align-items-center justify-content-center">
                        <button className="btn btn-primary m-2" onClick={() => checkClick(1)}>Add WareHouses</button>
                        <button className="btn btn-primary m-2" onClick={() => checkClick(2)}>Check Bank Account</button>
                        <button className="btn btn-danger m-2" onClick={handleLogout}>Logout</button>
                    </div>
                    {handleClick()}
                </div>
            ) : (
                <div>
                    <h1>Not Authorized</h1>
                </div>
                )
            }
        </div>
        
        
    )
}